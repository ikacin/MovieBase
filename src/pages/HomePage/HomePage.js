import React,{useState,useEffect,useContext } from 'react';
import {useNavigate,useParams } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import mainBanner from'../../assests/image/banner.webp';
import subBanner from'../../assests/image/sub-banner.webp';
import trending from'../../assests/image/trending-bg.svg';
import {Container, Flex, Radio} from '@mantine/core';
import CustomButton from "../../components/atoms/CustomButton";
import {IconSearch, IconArrowRight, IconCheck, IconX} from '@tabler/icons-react';
import CustomTabs from "../../components/atoms/Tabs";
import Axios from 'axios';
import RingProgress from "../../components/atoms/RingProgress";
import CustomSkeleton from "../../components/atoms/Skeleton";
import { useTranslation } from 'react-i18next';
import { IconDots } from '@tabler/icons-react';
import CustomMenu from "../../components/atoms/Menu";
import CustomPaper from "../../components/atoms/Box";
import CustomProgress from "../../components/atoms/Progress";
import Footer from "../../components/organisms/Footer/Footer";
import {MyContext} from "../../store/Store";
import SearchInput from "../../components/molecules/SearchInput";
import {showNotification, updateNotification} from "@mantine/notifications";

const HomePage = () => {
    const { t } = useTranslation();
    const [list,setList] = useState([])
    const [nowList,setNowList] = useState([])
    const [popularList,setPopularList] = useState([])
    const[upComingList,setUpComingList] = useState([])
    const[leadList,setLeadList] = useState([])
    const[average,setAverage] = useState([])
    const[names,setNames] = useState([])
    const[loading,setLoading] = useState(true)
    const[isLoading,setIsloading] = useState(true);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [posterPathItem, setPosterPathItem] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const[searchValue,setSearchValue] = useState("");
    const navigate = useNavigate();
    const { lang } = useParams();
    const{state,dispatch} = useContext(MyContext)
    const languageCode = lang === "tr" ? "tr-TR" : "en-US";

    const gotoPage = () => {
        window.location.href = "/2023";
    }

    const pageDetails = (id) => {
        navigate(`/${lang}/movie/${id}`);
    }

    const gotoPageAndOpenMenu = () => {
        gotoPage();
    }
    const TopRated = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=${languageCode}&page=1`, options);
            console.log(response.data);
            setList(response.data.results)
        } catch (error) {
            console.error(error);
        }  finally {
            setLoading(false);
        }
    };

    const NowPlaying = async () => {
        setIsloading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=${languageCode}&page=1`, options);
            console.log(response.data);
            setNowList(response.data.results)
        } catch (error) {
            console.error(error);
        }finally {
            setIsloading(false)
        }
    };


    const PopularFilms = async () => {
        setIsloading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/trending/movie/week?language=${languageCode}`, options);
            console.log(response.data);
            setPopularList(response.data.results)
        } catch (error) {
            console.error(error);
        }finally {
            setIsloading(false)
        }
    };

    const UpComing = async () => {
        setIsloading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=${languageCode}&page=1`, options);
            console.log(response.data);
            setUpComingList(response.data.results)
        } catch (error) {
            console.error(error);
        }finally {
            setIsloading(false)
        }
    };


    const Leaderboards = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/person/popular?language=${languageCode}&page=1`, options);
            console.log(response.data);
            if (response.data.results.length > 0) {
                setNames( response.data.results.map(item => item.name));
                setLeadList(response.data.results.map(i => i.known_for[0].popularity))
                setAverage(response.data.results.map(i => i.known_for[0].vote_average))
                setPosterPathItem(response.data.results)
                console.log(posterPathItem)
            }
        } catch (error) {
            console.error(error);
        }
    };





    const handleMenuClick = () => {
        setIsMenuClicked(!isMenuClicked);
    };




    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            let searchTerm = searchValue.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();
            navigate(`/${lang}/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };



    const addFavorite = (item) => {
            const isFavorited = state?.favoriteItems?.includes(item.id) || false;
            const message = isFavorited ? "Favoriden çıkarıldı." : "Favorilere eklendi.";
            Axios.post(`https://api.themoviedb.org/3/account/20865423/favorite`, {
                "media_id": item.id,
                "media_type": "movie",
                "favorite": !isFavorited
            }, {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }).then(function (response) {
                if (response.data.success === true) {
                   dispatch({type:'FAVORITE',payload:item.id});
                }else {
                    return response
                } showNotification({
                    id: 'load-data',
                    autoClose: false,
                    disallowclose: true,
                    loading: true,
                    title:"Please Wait",
                })
                setTimeout(() => {
                    updateNotification({
                        id: 'load-data',
                        color: 'teal',
                        title:"Success",
                        message:message,
                        icon: <IconCheck size="1rem" />,
                        autoClose: 1000,
                    });
                }, 1000);
            })
                .catch(function (error) {
                    console.error("Error submitting rating:", error);
                    showNotification({
                        id: 'error-notification',
                        disallowClose: false,
                        autoClose: 5000,
                        title: "Error",
                        message: "An error occurred while submitting your rating. Please try again.",
                        color: 'red',
                        icon: <IconX size="1rem" />,
                        className: 'my-notification-class',
                        style: { backgroundColor: '#fff' },
                        loading: false,
                    });
                });
    };



    const getAllFavorite = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/account/20865423/favorite/movies?language=${languageCode}&page=1&sort_by=created_at.desc`, options);
            console.log(response.data);
            if (response.data.results.length > 0) {


            }
        } catch (error) {
            console.error(error);
        }
    };




    useEffect(() => {
        TopRated()
        PopularFilms()
        UpComing()
        getAllFavorite()
        console.log(state)
        setTimeout(() => {
            Leaderboards()
        },3000)
    }, []);

    const roundToInteger = (number) => {
        return Math.round(number);
    }




    return(
            <>
                <Container size={"xl"} mb={"50px"}>
                    <Section>
                        <BannerContainer>
                            <ContentWrapper className="content_wrapper wrap">
                                <TitleBanner>
                                    <div>{t("language_settings")}</div>
                                    <div>{t("more_films_discovery")}</div>
                                </TitleBanner>

                                <SearchWrap className="search">
                                    <div>
                                        <SearchInput
                                          leftIcon={false}
                                          placeholder={"Film, dizi, kişi ara..."}
                                          size="md"
                                          radius="lg"
                                          value={searchValue}
                                          setValue={setSearchValue}
                                          onKeyDown={(event) => handleKeyDown(event)}
                                        />

                                        <CustomButton
                                            children={"Search"}
                                            radius={"60px"}
                                            size={"md"}
                                            leftIcon={<IconSearch size="1rem" />}
                                            background={"#07bbd6"}
                                        />
                                    </div>
                                </SearchWrap>
                            </ContentWrapper>
                        </BannerContainer>

                        <SubBannerContainer>
                            <ContentWrapper>
                                <StyledText>
                                    <Gradient className="gradient">
                                        <div>That's a</div>
                                        <div>Wrap 2023</div>
                                    </Gradient>
                                    <SubText>
                                        <div >{t("the_best_year")}</div>

                                        <CustomButton
                                            children={"Check it out"}
                                            radius="lg"
                                            variant="outline"
                                            leftIcon={<IconArrowRight size="1rem" />}
                                            onClick={gotoPageAndOpenMenu}
                                        />


                                    </SubText>
                                </StyledText>
                            </ContentWrapper>
                        </SubBannerContainer>

                        <SliderContent>
                            <StyledTrend>
                                <div className={"wrap-list"}>
                                    {
                                        isLoading &&  loading ? <StyledLoader>
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                            </StyledLoader>
                                            :
                                            <CustomTabs
                                                px={"30px"}
                                                display={"flex"}
                                                NowPlaying={NowPlaying}
                                                caption={"Trend"}
                                                VisualComm={"Bugün"}
                                                MediaHub={"Bu Hafta"}
                                                text={
                                                    list.map((item,index) => {
                                                        return(
                                                            <div>
                                                                <TrendingContainer>
                                                                    <CardStyle id={"card-style-first"}>
                                                                        <StyledMovie  key={index}>
                                                                            <StyledImage >
                                                                                <img
                                                                                    onClick={() => pageDetails(item.id)}
                                                                                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}
                                                                                />
                                                                                <CustomMenu
                                                                                    addFavorite={() => addFavorite(item)}
                                                                                    Context={<PositionedIcon size={18}  />}
                                                                                    onClick={() => handleMenuClick(item)}
                                                                                    itemId={item.id}
                                                                                    setSelectedItemId={setSelectedItemId}
                                                                                />
                                                                            </StyledImage>

                                                                            <ProgressWrap>
                                                                                <RingProgress size={50} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"10px", color: '#ffffff' }}>%</span></span>
                                                                                } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                            </ProgressWrap>
                                                                            <div className={"movie-text"}>
                                                                                <div key={index}>{item.title}</div>
                                                                                <div>{item.release_date}</div>
                                                                            </div>
                                                                        </StyledMovie>
                                                                    </CardStyle>
                                                                </TrendingContainer>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                content={
                                                    nowList.map((item,index) => {
                                                        return(
                                                            isLoading ? <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                :
                                                                <div>
                                                                    <TrendingContainer>
                                                                        <CardStyle id={"card-style-first"}>
                                                                            <StyledMovie>
                                                                                <img  onClick={() => pageDetails(item.id)}  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                                <ProgressWrap>
                                                                                    <RingProgress size={40} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"6px", color: '#ffffff' }}>%</span></span>
                                                                                    } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                                </ProgressWrap>
                                                                                <div className={"movie-text"}>
                                                                                    <div key={index}>{item.title}</div>
                                                                                    <div>{item.release_date}</div>
                                                                                </div>
                                                                            </StyledMovie>
                                                                        </CardStyle>

                                                                    </TrendingContainer>

                                                                </div>
                                                        )
                                                    })
                                                }
                                                type={"list"}
                                                defaultValue={"gallery"}
                                            />
                                    }

                                </div>
                            </StyledTrend>
                        </SliderContent>


                        <SliderContent>
                            <StyledTrend>
                                <div className={"wrap-list"}>
                                    {
                                        isLoading &&  loading ? <StyledLoader>
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                            </StyledLoader>
                                            :
                                            <CustomTabs
                                                display={"flex"}
                                                NowPlaying={NowPlaying}
                                                caption={"Popüler Olanlar"}
                                                VisualComm={"Bugün"}
                                                MediaHub={"Bu Hafta"}
                                                text={
                                                    popularList.map((item,index) => {
                                                        return(
                                                            <div>
                                                                <TrendingContainer>
                                                                    <CardStyle id={"card-style-first"}>
                                                                        <StyledMovie  key={index}>
                                                                            <StyledImage >
                                                                                <img  onClick={() => pageDetails(item.id)}   src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                                <CustomMenu
                                                                                    addFavorite={() => addFavorite(item)}
                                                                                    Context={<PositionedIcon size={18}  />}
                                                                                    onClick={() => handleMenuClick(item)}
                                                                                    itemId={item.id}
                                                                                    setSelectedItemId={setSelectedItemId}
                                                                                />
                                                                            </StyledImage>

                                                                            <ProgressWrap>
                                                                                <RingProgress size={50} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"10px", color: '#ffffff' }}>%</span></span>
                                                                                } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                            </ProgressWrap>
                                                                            <div className={"movie-text"}>
                                                                                <div key={index}>{item.title}</div>
                                                                                <div>{item.release_date}</div>
                                                                            </div>
                                                                        </StyledMovie>
                                                                    </CardStyle>
                                                                </TrendingContainer>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                content={
                                                    nowList.map((item,index) => {
                                                        return(
                                                            isLoading ? <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                :
                                                                <div>
                                                                    <TrendingContainer>
                                                                        <CardStyle id={"card-style-first"}>
                                                                            <StyledMovie>
                                                                                <img  onClick={() => pageDetails(item.id)}  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                                <ProgressWrap>
                                                                                    <RingProgress size={40} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"6px", color: '#ffffff' }}>%</span></span>
                                                                                    } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                                </ProgressWrap>
                                                                                <div className={"movie-text"}>
                                                                                    <div key={index}>{item.title}</div>
                                                                                    <div>{item.release_date}</div>
                                                                                </div>
                                                                            </StyledMovie>
                                                                        </CardStyle>
                                                                    </TrendingContainer>

                                                                </div>
                                                        )
                                                    })
                                                }
                                                type={"list"}
                                                defaultValue={"gallery"}
                                            />
                                    }

                                </div>
                            </StyledTrend>
                        </SliderContent>


                        <SliderContent>
                            <StyledTrend>
                                <div className={"wrap-list"}>
                                    {
                                        isLoading &&  loading ? <StyledLoader>
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                            </StyledLoader>
                                            :
                                            <CustomTabs
                                                display={"flex"}
                                                NowPlaying={NowPlaying}
                                                caption={"İzlemek Ücretsiz"}
                                                VisualComm={"Bugün"}
                                                MediaHub={"Bu Hafta"}
                                                text={
                                                    upComingList.map((item,index) => {
                                                        return(
                                                            <div>
                                                                <TrendingContainer>
                                                                    <CardStyle id={"card-style-first"}>
                                                                        <StyledMovie  key={index}>
                                                                            <StyledImage >
                                                                                <img  onClick={() => pageDetails(item.id)}  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                                <CustomMenu
                                                                                    addFavorite={() => addFavorite(item)}
                                                                                    Context={<PositionedIcon size={18}  />}
                                                                                    onClick={() => handleMenuClick(item)}
                                                                                    itemId={item.id}
                                                                                    setSelectedItemId={setSelectedItemId}
                                                                                />
                                                                            </StyledImage>

                                                                            <ProgressWrap>
                                                                                <RingProgress size={50} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"10px", color: '#ffffff' }}>%</span></span>
                                                                                } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                            </ProgressWrap>
                                                                            <div className={"movie-text"}>
                                                                                <div key={index}>{item.title}</div>
                                                                                <div>{item.release_date}</div>
                                                                            </div>
                                                                        </StyledMovie>
                                                                    </CardStyle>
                                                                </TrendingContainer>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                content={
                                                    nowList.map((item,index) => {
                                                        return(
                                                            isLoading ? <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                :
                                                                <div>
                                                                    <TrendingContainer>
                                                                        <CardStyle id={"card-style-first"}>
                                                                            <StyledMovie>
                                                                                <img  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                                <ProgressWrap>
                                                                                    <RingProgress size={40} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"6px", color: '#ffffff' }}>%</span></span>
                                                                                    } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                                </ProgressWrap>
                                                                                <div className={"movie-text"}>
                                                                                    <div key={index}>{item.title}</div>
                                                                                    <div>{item.release_date}</div>
                                                                                </div>
                                                                            </StyledMovie>
                                                                        </CardStyle>
                                                                    </TrendingContainer>

                                                                </div>
                                                        )
                                                    })
                                                }
                                                type={"list"}
                                                defaultValue={"gallery"}
                                            />
                                    }

                                </div>
                            </StyledTrend>
                        </SliderContent>

                        <StyledLead >

                            <CustomPaper
                                title={
                                    <TitleStyled>
                                        <div>Liderler Sıralaması</div>
                                        <InfoItem>
                                            <div>Tüm Zaman Düzenlemeleri</div>
                                            <div>Bu Hafta Yapılan Düzenlemeler</div>
                                        </InfoItem>
                                    </TitleStyled>
                                }

                                type={"avatar"}
                                padding={"20px"}
                                fontSize={"20px"}
                                borderradius={"5px 5px 0 0" }
                                textFirst={
                                    <Item>
                                        <div>{names[0]}</div>
                                        <CustomProgress values={[leadList[0]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={average[0]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textSecond={
                                    <Item>
                                        <div>{names[1]}</div>
                                        <CustomProgress values={[leadList[1]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={average[1]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textThird={
                                    <Item>
                                        <div>{names[2]}</div>
                                        <CustomProgress values={[leadList[2]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={average[2]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textFourth={
                                    <Item>
                                        <div>{names[3]}</div>
                                        <CustomProgress values={[leadList[3]]} colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={average[3]} colors={[,"#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textFifth={
                                    <Item>
                                        <div>{names[4]}</div>
                                        <CustomProgress values={[leadList[4]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={[average[4]]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }

                            />

                            <CustomPaper
                                type={"avatar"}
                                padding={"20px"}
                                fontSize={"20px"}
                                borderradius={"5px 5px 0 0" }
                                textFirst={
                                    <Item>
                                        <div>{names[5]}</div>
                                        <CustomProgress
                                            values={[leadList[5]]}  colors={["#c0fecf","#61e6b9"]}
                                            label={"test"}
                                        />
                                        <CustomProgress
                                            values={average[5]}
                                            colors={["#fabf6f","#e05666"]}
                                            label={"test"}

                                        />
                                    </Item>
                                }
                                textSecond={
                                    <Item>
                                        <div>{names[6]}</div>
                                        <CustomProgress values={[leadList[6]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={[average[6]]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textThird={
                                    <Item>
                                        <div>{names[7]}</div>
                                        <CustomProgress values={[leadList[7]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={[average[7]]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textFourth={
                                    <Item>
                                        <div>{names[8]}</div>
                                        <CustomProgress values={[leadList[8]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={[average[8]]}   colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                                textFifth={
                                    <Item>
                                        <div>{names[9]}</div>
                                        <CustomProgress values={[leadList[9]]}  colors={["#c0fecf","#61e6b9"]}/>
                                        <CustomProgress values={[average[9]]} colors={["#fabf6f","#e05666"]}/>
                                    </Item>
                                }
                            />
                        </StyledLead>

                    </Section>
                </Container>
               <Footer/>
            </>

        )

}

const Section = styled.div`
  width: 100%;
`

const BannerContainer = styled.div`
  background-image: url(${mainBanner});
  background-size: cover;
  background-position: center;
  width: 100%;
  background-color:rgba(0,0,0,0.7);
  background-blend-mode: multiply;
  height:320px; 
`;

const SubBannerContainer = styled.div`
  background-image: url(${subBanner});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 290px;
  background-color:rgba(0,0,0,0.7); 
  background-blend-mode: multiply; 
  background-repeat: no-repeat;
`;


const TrendingContainer = styled.div`
  background-image: url(${trending});
  background-position: center;
  width: 100%;
  height: 338px;
  background-repeat: no-repeat;
  display: flex;
  background-position-y: 90px;
`;


const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 50px;
  gap: 50px;
  color: #ffffff;
`

const TitleBanner = styled.div`
  & div:nth-child(1){
    font-size: 3em;
    font-weight: 700;
    line-height: 1;
  }
  & div:nth-child(2){
    font-size: 2em;
    font-weight: 600;
    margin: 0;
  }

`
const SearchWrap = styled.div`
  width: 100%;
  & div{
    display: flex;
    width: 100%;
  }
  
  .mantine-Input-input::placeholder {
    font-size: 1.1em;
    color: rgba(0,0,0,.5);
    padding: 10px 20px;
  }

`
const Gradient = styled.div`
    background-image: linear-gradient(to bottom right, #9dcba4 0%, #53b1dd 50%, #298af5 100%);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 63px;
    
  & div:first-child{
    font-weight: 700;
    font-size: 60px;
  }
  
  & div:nth-child(2){
    font-weight: 700;
    font-size: 60px;
  }
`
const StyledText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

`
const SubText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  
  & a:nth-child(2){
    display: inline-flex;
    align-items: center;
    margin: 0;
    color: #fff;
    border-radius: 30px;
    border: 2px solid #fff;
    padding: 8px 16px;
    transition: linear .1s;
    text-decoration: none;
  }
`

const StyledTrend = styled.div`
.wrap-list{
  gap: 30px;
  font-size: 1.2em;
  color: #000000;
}
  
  #caption-text{
    font-size: 1.2em;
    font-weight: 600;
    color: #000000;
  }

`
const CardStyle = styled.div`
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  width: 100%;
  min-height: calc(150px*1.5);
  height: calc(150px*1.5);
  margin: 8px -20px 8px 40px;
  z-index: 9;
  .movie-text{
    padding-top: 30px;
  }
  
  .movie-text div:nth-child(1){
    font-weight: 700;
    color: #000;
    font-size: 14px;
  }

  .movie-text div:nth-child(2){
    color: rgba(0,0,0,.6);
    font-size: 12px;
  }
  
  & img{
    border-radius: 8px;
    height: auto;
  }
;
`

const ProgressWrap = styled.div`
    position: relative;
  
    .mantine-RingProgress-root{
      position: absolute;
      top: -25px;
      left: -1px;
    }

`
const StyledLoader = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1230px;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: 320px;
`

const SliderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 30px 0;
  gap: 50px;
  color: #ffffff;
`
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const StyledMovie = styled.div`
  animation: ${fadeIn} 2s ease;
  transition: transform 0.3s ease;
  ${({isMenuClicked}) => isMenuClicked && `
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    border-radius: var(--imageBorderRadius);
    z-index: 5;
    transition: linear 0.1s;
    opacity: 0;
  
  `}

  
  
`;
const StyledImage = styled.div`
  position: relative;
  display: inline-block; /* Optional: makes the container fit its content */
  cursor: pointer;
`;

const PositionedIcon = styled(IconDots)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #999fa3;
  border-radius: 50%;
  
  &:hover{
    opacity: 1;
    cursor: pointer;
    background: #01b4e5;
  }
  
`;

const StyledLead = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`
const Item = styled.div`
    width: 520px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
 
`

const TitleStyled = styled.div`
  display: flex;
  gap: 20px;
  
  & div:first-child{
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
  }
  
`
const InfoItem = styled.div`
  
    &  div:first-child{
      font-size:11px;
      gap: 5px;
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
  & div:first-child::before {
    content: "";
    display: inline-block;
    background: #e05666;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
    
  &  div:nth-child(2){
    font-size:11px;
    gap: 5px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  & div:nth-child(2)::before {
    content: "";
    display: inline-block;
    background: #61e6b9;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

`
export default HomePage