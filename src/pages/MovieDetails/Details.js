import React, {useState, useEffect} from 'react';
import LangButton from "../../components/atoms/LangButton";
import SubHeader from "../../components/organisms/Header/SubHeader";
import {ActionIcon, CloseButton, Container, Flex, Text} from '@mantine/core';
import styled, { keyframes, css } from 'styled-components';
import Axios from 'axios';
import {useParams,useNavigate } from "react-router-dom";
import CustomRingProgress from "../../components/atoms/RingProgress";
import {
    IconList,
    IconHeartFilled,
    IconBookmarkFilled,
    IconStarFilled,
    IconPlayerPlayFilled,
    IconBrandFacebook,
    IconBrandTwitterFilled,
    IconBrandInstagram,
    IconBrandGooglePlay,
    IconDna,
    IconLock,
    IconThumbDownFilled,
    IconThumbUpFilled, IconX, IconCheck,
} from '@tabler/icons-react';
import AvatarItems from "../../components/atoms/Avatar";
import CustomToolTip from "../../components/atoms/Tooltip";
import CustomModal from "../../components/atoms/Modal";
import trending from "../../assests/image/trending-bg.svg";
import CustomSkeleton from "../../components/atoms/Skeleton";
import logo from '../../assests/image/no-image-.png';
import CustomDivider from "../../components/atoms/Divider";
import CustomTabs from "../../components/atoms/Tabs";
import Footer from "../../components/organisms/Footer/Footer";
import CustomGrid from "../../components/atoms/Grid";
import CustomBadge from "../../components/atoms/Badge";
import Images from "../../components/atoms/Images";
import DataNotFound from "../../components/atoms/DataNotFound";
import {showNotification, updateNotification} from "@mantine/notifications";

const Details = () => {
    const [list,setList] = useState([])
    const[movieDetails,setMovieDetails] = useState([]);
    const[videoList,setVideoList] = useState([])
    const[creditsList,setCreditsList] = useState([])
    const[isLoading,setIsloading] = useState(true);
    const[loading,setLoading] = useState(true);
    const [posterUrl, setPosterUrl] = useState(null);
    const [reviewsList, setReviewsList] = useState([]);
    const[keywordsList,setKeywordsList] = useState([]);
    const[recommendList,setRecommendList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const[total,setTotal] = useState(null)
    const navigate = useNavigate()
    const { movieId } = useParams();
    const{lang} = useParams()
    const languageCode = lang === "tr" ? "tr-TR" : "en-US";

    const MovieDetails = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=${languageCode}`, options);
            console.log(response.data);
            setMovieDetails(response.data)
            setList(response.data)
            setPosterUrl(`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${response.data.poster_path}`); // posterUrl'yi burada güncelliyoruz
        } catch (error) {
            console.error(error);
        }  finally {

        }
    };


    const getVideos = async () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=${languageCode}`, options);
            console.log("videos",response.data.results);

            setVideoList(response.data.results)
        } catch (error) {
            console.error(error);
        }  finally {

        }
    };


    const getCredits = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=${languageCode}`, options);
            console.log("credits",response.data);

            setCreditsList(response.data.cast)
        } catch (error) {
            console.error(error);
        }  finally {
            setLoading(false)
        }
    };

    const getReviews = async () => {
        setIsloading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${languageCode}&page=1`, options);
            console.log("reviews",response.data);
            setReviewsList(response.data.results)
            setTotal(response.data.total_results)
        } catch (error) {
            console.error(error);
        }  finally {
            setIsloading(false)
        }
    };


    const getKeywords = async () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords`, options);
            console.log("keywords",response.data.keywords);
            setKeywordsList(response.data.keywords)

        } catch (error) {
            console.error(error);
        }  finally {

        }
    };


    const getRecommendations = async () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, options);
            console.log("recommendations",response.data.results);
            setRecommendList(response.data.results)

        } catch (error) {
            console.error(error);
        }  finally {

        }
    };


    useEffect(() => {
        MovieDetails()
        getVideos()
        getCredits()
        getKeywords()
        getRecommendations()
    },[])


    function formatRuntime(runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return hours + 'h ' + minutes + 'm';
    }

    const formattedRuntime = formatRuntime(list.runtime);

    function formatNumberToDollar(number) {
        return '$' + new Intl.NumberFormat('en-US').format(number);
    }

    const personBtn = (item) => {
        navigate(`/${lang}/person/${item.id}`);
    }

    const getHomePageLink = (link) => {
        window.open(link, '_blank');
    }

    const closeBtn = () => {
        setModalOpen(false)
    }

    const ratingAdd = async (movieDetails,rating) => {
        await Axios.post(`https://api.themoviedb.org/3/movie/${movieDetails}/rating`, {
            "value": rating,
        }, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        }).then(function (response) {
            if (response.data.success === true) {
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
                    message:"Görüntüyü Başarıyla Derecelendirdiniz",
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
    }



    const ratingDelete = async (movieDetails) => {
        await Axios.delete(`https://api.themoviedb.org/3/movie/${movieDetails}/rating`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }).then(function (response) {
            if (response.data.success === true) {
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
                    message:"Öğe/Kayıt Başarıyla Silindi",
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
    }

    const discussPage = (movieId) => {
        navigate(`/${lang}/movie/${movieId}/discuss`);
    }


    return(
        <div>
            <LangButton/>
            <SubHeader/>
            <Container
                fluid={true}
                px={0}
            >
                <InnerContentCustomBg posterUrl={posterUrl}>
                    <Container
                        fluid={true}
                        m={"0"}
                        p={"0"}
                    >
                        <HeaderLargeFirst  posterUrl={posterUrl}>
                            <Wrappers>
                                <StyledPoster>
                                    <img
                                        alt={""}
                                        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.backdrop_path}.jpg`}
                                    />
                                    <CustomModal
                                        setOpenedX={closeBtn}
                                        headerDisplay={"none"}
                                        className={"overlay"}
                                        position={"left"}
                                        btn={
                                            "Büyüt"
                                        }
                                        size="60%"
                                        height={"650px"}
                                        boxshadow={"none"}
                                        padding={"0"}
                                        centered={true}
                                        content={
                                            <Flex
                                            >
                                                <div>
                                                    <Images
                                                        height={"650px"}
                                                        radius="0"
                                                        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}.jpg`}
                                                    />
                                                </div>

                                                <Flex
                                                    style={{flexGrow:1}}
                                                >
                                                    <Flex
                                                        direction={"column"}
                                                        w={"100%"}
                                                    >
                                                        <Flex
                                                            px={"10px"}
                                                            justify={"flex-end"}
                                                            w={"100%"}
                                                            style={{flexGrow:"0.5"}}
                                                        >
                                                            <div
                                                                onClick={closeBtn}
                                                            >
                                                                <CloseButton
                                                                    title="Close popover"
                                                                    size="xl"
                                                                    iconSize={20}
                                                                />
                                                            </div>
                                                        </Flex>

                                                        <Flex
                                                            justify={"space-between"}
                                                            px={"xl"}
                                                        >
                                                            <ActionIcon
                                                                onClick={() => ratingDelete(movieDetails.id)}
                                                                variant="transparent" >
                                                                <IconThumbDownFilled stroke={2} />
                                                            </ActionIcon>
                                                            <ActionIcon
                                                                onClick={() => ratingAdd(movieDetails.id,"0.5")}
                                                                variant="transparent"
                                                            >
                                                                <IconThumbUpFilled
                                                                    stroke={2}
                                                                />
                                                            </ActionIcon>
                                                        </Flex>

                                                        <Flex
                                                            direction={"column"}
                                                            gap={"md"}
                                                        >
                                                            <Flex
                                                                pt={"50px"}
                                                                px={"20px"}
                                                                justify={"space-between"}
                                                            >
                                                                <div>Bilgi</div>
                                                                <div>
                                                                    <IconLock stroke={2} size={"20px"}/>
                                                                </div>
                                                            </Flex>

                                                            <CustomDivider />
                                                        </Flex>
                                                        <Flex
                                                            pt={"20px"}
                                                            px={"20px"}
                                                            direction={"column"}
                                                            gap={"20px"}
                                                        >
                                                            <div>
                                                                <Text fw={600}>Birincil</Text>
                                                                <Text>{movieDetails.title}</Text>
                                                            </div>
                                                            <div>
                                                                <Text fw={600}>yayın tarihi</Text>
                                                                <Text>{movieDetails.release_date}</Text>
                                                            </div>
                                                            <div>
                                                                <Text fw={600}>Slogan</Text>
                                                                <Text>{movieDetails.tagline}</Text>
                                                            </div>

                                                            <div>
                                                                <Text fw={600}>Dil</Text>
                                                                <Text>
                                                                    {movieDetails && movieDetails.spoken_languages &&
                                                                        movieDetails.spoken_languages[0].english_name
                                                                    }
                                                                </Text>

                                                            </div>
                                                            <div>
                                                                <Text fw={600}>Link</Text>
                                                                <Text
                                                                    style={{cursor:"pointer"}}
                                                                >
                                                                    <Text
                                                                        color={"blue"}
                                                                        onClick={() => getHomePageLink(movieDetails.homepage)}
                                                                    >
                                                                        İzlemek için Tıkla
                                                                    </Text>
                                                                </Text>
                                                            </div>
                                                        </Flex>

                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        }
                                    />

                                </StyledPoster>
                                <StyledList>
                                    <Title>{list.original_title}</Title>
                                    <InfoItem>
                                        <div>{list.release_date}</div>
                                        <div>{formattedRuntime}</div>
                                        <StyleGenres>
                                            {list.genres &&  list.genres.map((genre) => (
                                                <div key={genre.id}>{genre.name}</div>
                                            ))}
                                        </StyleGenres>

                                    </InfoItem>
                                    <ContentList>
                                        <CustomRingProgress
                                            value={list.vote_average}
                                            count={list.vote_average}
                                            color={"green"}
                                            size={90}
                                            thickness={10}
                                        />
                                        <div>Üye Puanları</div>
                                        <StyledIcons>
                                            <div>
                                                <CustomToolTip
                                                    label={"Listeye Ekle"}
                                                    position={"bottom"}
                                                    text={
                                                        <AvatarItems
                                                            background={"#032541"}
                                                            size={"50px"}
                                                            color={"#fff"}
                                                            type={4}
                                                            Icon={<IconList
                                                                stroke={2.5}
                                                                size={"15px"}/>}/>
                                                    } />

                                            </div>
                                            <div>

                                                <CustomToolTip
                                                    label={"Favori Olarak İşaretle"}
                                                    position={"bottom"}
                                                    text={
                                                        <AvatarItems
                                                            background={"#032541"}
                                                            size={"50px"}
                                                            type={4}
                                                            color={"#fff"}
                                                            Icon={<IconHeartFilled
                                                                stroke={2.5}
                                                                size={"15px"}/>}/>
                                                    } />

                                            </div>
                                            <div>

                                                <CustomToolTip
                                                    label={"İzleme Listesine Ekle"}
                                                    position={"bottom"}
                                                    text={
                                                        <AvatarItems
                                                            background={"#032541"}
                                                            size={"50px"}
                                                            type={4}
                                                            color={"#fff"}
                                                            Icon={<IconBookmarkFilled
                                                                stroke={2.5}
                                                                size={"15px"}/>}/>
                                                    } />

                                            </div>
                                            <div>

                                                <CustomToolTip
                                                    label={"Oyla!"}
                                                    position={"bottom"}
                                                    text={
                                                        <AvatarItems
                                                            background={"#032541"}
                                                            size={"50px"}
                                                            type={4}
                                                            color={"#fff"}
                                                            Icon={<IconStarFilled
                                                                stroke={2.5}
                                                                size={"15px"}/>}/>
                                                    } />

                                            </div>
                                            <div>
                                                <StyledPlay>

                                                    <CustomModal btn={"Fragmanı Oynat"}
                                                                 heightX={""}
                                                                 leftIcon={ <IconPlayerPlayFilled
                                                                     stroke={2.5}
                                                                     size={"24px"}

                                                                 />}
                                                                 title={"Fragmanı Oynat"}
                                                                 size="75%"
                                                                 height={"950px"}
                                                                 padding={"5px 0 0 0"}
                                                                 background={"transparent"}
                                                                 boxshadow={"none"}
                                                                 disabled={videoList.length === 0 ? true : false}
                                                                 content={
                                                                     <FragmentModal>
                                                                         {loading ? (
                                                                             <div>Yükleniyor...</div>
                                                                         ) : videoList.length > 0 ? (
                                                                             videoList.map((item, index) => (
                                                                                 <div key={index}>
                                                                                     {index === 2 && (
                                                                                         <iframe
                                                                                             width="560"
                                                                                             height="315"
                                                                                             src={`//www.youtube.com/embed/${item.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=tr&modestbranding=1&fs=1&autohide=1`}
                                                                                             title="YouTube video player"
                                                                                             frameBorder="0"
                                                                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                             allowFullScreen
                                                                                         ></iframe>
                                                                                     )}
                                                                                 </div>
                                                                             ))
                                                                         ) : (
                                                                             <DataNotFound/>
                                                                         )}
                                                                     </FragmentModal>

                                                                 }
                                                    />
                                                </StyledPlay>
                                            </div>
                                        </StyledIcons>
                                    </ContentList>
                                    <TagLine>
                                        {list.tagline}
                                    </TagLine>
                                    <StyleOverview>
                                        <div>Özet</div>
                                        <div>{list.overview}</div>
                                    </StyleOverview>
                                </StyledList>
                            </Wrappers>
                        </HeaderLargeFirst>
                    </Container>
                </InnerContentCustomBg>

                <Container size={"xl"}>
                    <Container size={"xl"}>
                        <CustomGrid firstValue={10}
                                    secondValue={2}
                                    first={
                                        <Container size="xl">
                                            <SliderContent>
                                                <StyledTrend>
                                                    <div className={"wrap-list"}>
                                                        {
                                                            loading ? <StyledLoader>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                    <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]}
                                                                                    widths={['150px', '150px', '150px']}/>
                                                                </StyledLoader>
                                                                :
                                                                <CreditsWrap>
                                                                    <LeadActors>Öne Çıkan Oyuncular</LeadActors>
                                                                    <StyledCredits>
                                                                        {creditsList.map((item, index) => (
                                                                            <div key={index}>
                                                                                <TrendingContainer>
                                                                                    <CardStyle id={"card-style-first"}>
                                                                                        <StyledMovie>
                                                                                            <StyledImage>
                                                                                                <img
                                                                                                    onClick={() => personBtn(item)}
                                                                                                    src={item.profile_path ? `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.profile_path}.jpg` : logo}/>
                                                                                            </StyledImage>

                                                                                            <div className={"movie-text"}>
                                                                                                <div>{item.original_name}</div>
                                                                                                <div>{item.character}</div>
                                                                                            </div>
                                                                                        </StyledMovie>
                                                                                    </CardStyle>
                                                                                </TrendingContainer>
                                                                            </div>
                                                                        ))}
                                                                    </StyledCredits>
                                                                </CreditsWrap>
                                                        }

                                                    </div>
                                                </StyledTrend>
                                            </SliderContent>
                                            <Container size="xl">
                                                <CustomGrid
                                                    firstValue={12}
                                                    first={
                                                        <Container size="xl" px={0}>
                                                            <div>
                                                                <div>
                                                                    Tüm Oyuncular ve Ekip
                                                                </div>

                                                                <div style={{padding: "20px 0"}}>
                                                                    <CustomDivider/>
                                                                </div>

                                                                <div>
                                                                    <CustomTabs
                                                                        maxHeight={"30px"}
                                                                        NowPlaying={getReviews}
                                                                        caption={"Sosyal"}
                                                                        VisualComm={"Tartışmalar"}
                                                                        MediaHub={"Değerlendirmeler"}
                                                                        firstCount={0}
                                                                        secondCount={total}
                                                                        type={"list"}
                                                                        defaultValue={"gallery"}
                                                                        text={
                                                                            <Evaluation>
                                                                                {list.title} için yorumumuz yok. bir tane
                                                                                yazmak ister misiniz?
                                                                            </Evaluation>
                                                                        }
                                                                        content={
                                                                            <Flex
                                                                                direction={"column"}
                                                                            >
                                                                                {
                                                                                    isLoading ?
                                                                                        reviewsList.length && reviewsList.map((item, index) => (
                                                                                                <Flex
                                                                                                    direction={"column"}
                                                                                                >
                                                                                                    <CustomSkeleton
                                                                                                        index={index}
                                                                                                        heights={["calc(30px*1.5)"]}
                                                                                                        widths={['100%']}
                                                                                                    />
                                                                                                </Flex>
                                                                                            )
                                                                                        )

                                                                                        :
                                                                                        reviewsList.length ? (
                                                                                            <>
                                                                                                {reviewsList.slice(0, 3).map((item) => (
                                                                                                    <StyledReviews
                                                                                                        key={item.id || item.author_details.username}>
                                                                                                        <WrapNames>
                                                                                                            <AvatarItems
                                                                                                                type={1}
                                                                                                                src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${item.author_details.avatar_path}`}
                                                                                                            />
                                                                                                            <Text
                                                                                                                size={"sm"}
                                                                                                            >{item.author_details.username}
                                                                                                            </Text>
                                                                                                        </WrapNames>
                                                                                                        <Text
                                                                                                            c={"dimmed"}
                                                                                                            size={"xs"}
                                                                                                        >{new Date(item.created_at).toLocaleString('tr-TR')}
                                                                                                        </Text>
                                                                                                    </StyledReviews>
                                                                                                ))}
                                                                                                {reviewsList.length > 3 &&
                                                                                                    <Argument
                                                                                                        onClick={() => discussPage(movieId)}
                                                                                                    >Tartışmalara
                                                                                                        Git</Argument>}
                                                                                            </>
                                                                                        ) : (
                                                                                            <DataNotFound
                                                                                                height={"100%"}
                                                                                                fontSize={"12px"}
                                                                                                backgroundSize={"50px"}
                                                                                                paddingTop={"0"}
                                                                                            />
                                                                                        )
                                                                                }
                                                                            </Flex>
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <CustomDivider/>
                                                                </div>
                                                            </div>
                                                        </Container>
                                                    }/>
                                            </Container>


                                            <Container size="xl">
                                                <CustomGrid
                                                    firstValue={12}
                                                    first={
                                                        <Container size="xl" px={0}>
                                                            <div>

                                                                <StyledMedia>
                                                                    <CustomTabs
                                                                        maxHeight={"30px"}
                                                                        NowPlaying={getReviews}
                                                                        caption={"Medya"}
                                                                        populars={"En Popüler"}
                                                                        videos={"Videolar"}
                                                                        rear={"Arka planda"}
                                                                        placard={"Afişler"}
                                                                        secondCount={total}
                                                                        popularText={
                                                                            <div>
                                                                                <CustomModal
                                                                                    position={"left"}
                                                                                    btn={
                                                                                        <div style={{display: "flex"}}>
                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>


                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>

                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.belongs_to_collection?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>
                                                                                        </div>
                                                                                    }
                                                                                    title={"Fragmanı Oynat"}
                                                                                    size="75%"
                                                                                    height={"950px"}
                                                                                    padding={"5px 0 0 0"}
                                                                                    background={"transparent"}
                                                                                    boxshadow={"none"}
                                                                                    content={
                                                                                        <FragmentModal>
                                                                                            {videoList && videoList.map((item, index) => (
                                                                                                <div key={index}>
                                                                                                    {index === 0 && (
                                                                                                        <iframe
                                                                                                            width="560"
                                                                                                            height="315"
                                                                                                            src={`//www.youtube.com/embed/${item.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=tr&modestbranding=1&fs=1&autohide=1`}
                                                                                                            title="YouTube video player"
                                                                                                            frameBorder="0"
                                                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                            allowFullScreen
                                                                                                        ></iframe>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                        </FragmentModal>
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }
                                                                        videosText={
                                                                            <div>
                                                                                <CustomModal
                                                                                    position={"left"}
                                                                                    btn={
                                                                                        <div style={{display: "flex"}}>
                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>


                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>

                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt={""}
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.belongs_to_collection?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>
                                                                                        </div>
                                                                                    }
                                                                                    title={"Fragmanı Oynat"}
                                                                                    size="75%"
                                                                                    height={"950px"}
                                                                                    padding={"5px 0 0 0"}
                                                                                    background={"transparent"}
                                                                                    boxshadow={"none"}
                                                                                    content={
                                                                                        <FragmentModal>
                                                                                            {videoList && videoList.map((item, index) => (
                                                                                                <div key={index}>
                                                                                                    {index === 0 && (
                                                                                                        <iframe
                                                                                                            width="560"
                                                                                                            height="315"
                                                                                                            src={`//www.youtube.com/embed/${item.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=tr&modestbranding=1&fs=1&autohide=1`}
                                                                                                            title="YouTube video player"
                                                                                                            frameBorder="0"
                                                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                            allowFullScreen
                                                                                                        ></iframe>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                        </FragmentModal>
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }
                                                                        rearText={
                                                                            <div>
                                                                                <CustomModal
                                                                                    position={"left"}
                                                                                    btn={
                                                                                        <div style={{display: "flex"}}>
                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>

                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.belongs_to_collection?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>


                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>
                                                                                        </div>
                                                                                    }
                                                                                    title={"Fragmanı Oynat"}
                                                                                    size="75%"
                                                                                    height={"950px"}
                                                                                    padding={"5px 0 0 0"}
                                                                                    background={"transparent"}
                                                                                    boxshadow={"none"}
                                                                                    content={
                                                                                        <FragmentModal>
                                                                                            {videoList && videoList.map((item, index) => (
                                                                                                <div key={index}>
                                                                                                    {index === 0 && (
                                                                                                        <iframe
                                                                                                            width="560"
                                                                                                            height="315"
                                                                                                            src={`//www.youtube.com/embed/${item.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=tr&modestbranding=1&fs=1&autohide=1`}
                                                                                                            title="YouTube video player"
                                                                                                            frameBorder="0"
                                                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                            allowFullScreen
                                                                                                        ></iframe>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                        </FragmentModal>
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }

                                                                        placardText={
                                                                            <div>
                                                                                <CustomModal
                                                                                    position={"left"}
                                                                                    btn={
                                                                                        <div style={{display: "flex"}}>
                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.belongs_to_collection?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>
                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>

                                                                                            <PopularImage>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails?.backdrop_path}.jpg`}
                                                                                                />
                                                                                            </PopularImage>
                                                                                        </div>
                                                                                    }
                                                                                    title={"Fragmanı Oynat"}
                                                                                    size="75%"
                                                                                    height={"950px"}
                                                                                    padding={"5px 0 0 0"}
                                                                                    background={"transparent"}
                                                                                    boxshadow={"none"}
                                                                                    content={
                                                                                        <FragmentModal>
                                                                                            {videoList && videoList.map((item, index) => (
                                                                                                <div key={index}>
                                                                                                    {index === 0 && (
                                                                                                        <iframe
                                                                                                            width="560"
                                                                                                            height="315"
                                                                                                            src={`//www.youtube.com/embed/${item.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=tr&modestbranding=1&fs=1&autohide=1`}
                                                                                                            title="YouTube video player"
                                                                                                            frameBorder="0"
                                                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                            allowFullScreen
                                                                                                        ></iframe>
                                                                                                    )}
                                                                                                </div>
                                                                                            ))}
                                                                                        </FragmentModal>
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        }

                                                                        content={
                                                                            <div>
                                                                                {reviewsList.map((item, index) => (
                                                                                    index < 3 && (
                                                                                        <div key={index}>
                                                                                            <StyledReviews>
                                                                                                <WrapNames>
                                                                                                    <AvatarItems type={1}
                                                                                                                 src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${item.author_details.avatar_path}`}/>
                                                                                                    <div>{item.author_details.username}</div>
                                                                                                </WrapNames>
                                                                                                <div>{new Date(item.created_at).toLocaleString('tr-TR')}</div>
                                                                                            </StyledReviews>
                                                                                        </div>
                                                                                    )
                                                                                ))}
                                                                                {reviewsList.length > 3 &&
                                                                                    <Argument>Tartışmalara Git</Argument>}
                                                                            </div>
                                                                        }
                                                                        header={true}
                                                                        type={"more"}
                                                                        defaultValue={"popular"}
                                                                    />
                                                                </StyledMedia>
                                                            </div>
                                                        </Container>
                                                    }/>
                                            </Container>
                                        </Container>
                                    }

                                    second={
                                        <StyledMenu>
                                            <RightTopMenu>
                                                <IconBrandFacebook stroke={1} size={"34px"}/>
                                                <IconBrandTwitterFilled stroke={3} size={"34px"}/>
                                                <IconBrandInstagram stroke={1} size={"34px"}/>
                                                <StyledBefore>
                                                    <IconBrandGooglePlay stroke={1} size={"30px"}/>
                                                    <IconDna stroke={1} size={"30px"}/>
                                                </StyledBefore>
                                            </RightTopMenu>
                                            <RightList>
                                                <div>
                                                    <div className={"title"}>Orginal Başlık</div>
                                                    <div className={"text"}>{list.title}</div>
                                                </div>
                                                <div>
                                                    <div className={"title"}>Durum</div>
                                                    <div className={"text"}>{list.status}</div>
                                                </div>
                                                <div>
                                                    <div className={"title"}> Orginal Dili</div>
                                                    <div>
                                                        {list?.spoken_languages?.map(i => {
                                                            return <div className={"text"}>{i.name}</div>;
                                                        })}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={"title"}>Hasılat</div>
                                                    <div className={"text"}>{formatNumberToDollar(list.revenue)}</div>
                                                </div>
                                                <div>
                                                    <div className={"title"}>Bütçe</div>
                                                    <div className={"text"}>{formatNumberToDollar(list.budget)}</div>
                                                </div>
                                            </RightList>

                                            <StyledSticker>
                                                <div>Etiketler</div>
                                                <WrapKeywords>
                                                    {keywordsList.map((item, index) => (
                                                        <CustomBadge
                                                            padding={"13px 12px"}
                                                            colors={"#000"}
                                                            background={"#d7d7d7"}
                                                            radius={"sm"}
                                                            text={
                                                                <KeywordText key={index}
                                                                             className="sc-dPWqtL bhbwkB">{item.name}</KeywordText>
                                                            }
                                                        />
                                                    ))}
                                                </WrapKeywords>
                                            </StyledSticker>
                                            <div style={{padding: "20px 0"}}>
                                                <CustomDivider/>
                                            </div>
                                            <div>
                                                <div>İçerik Sonucu</div>
                                                <div>
                                                    <div>{list.popularity}</div>
                                                </div>
                                            </div>
                                        </StyledMenu>
                                    }
                        />


                          <CustomDivider />
                </Container>


                </Container>
                <Container size={"xl"}>
                    <CustomGrid firstValue={10}
                                secondValue={2}
                                first={
                                    <Container  size="xl">
                                        <SliderContent>
                                            <StyledTrend>
                                                <div className={"wrap-list"}>
                                                    {
                                                        loading ? <StyledLoader>
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                                <CustomSkeleton heights={["calc(150px*1.5)", 25, 25]} widths={['150px', '150px', '150px']}  />
                                                            </StyledLoader>
                                                            :
                                                            <CreditsWrap>
                                                                <LeadActors>Ayrıca Önerilenler</LeadActors>
                                                                <StyledCredits
                                                                 minHeight={"120px"}
                                                                 gap={"20px"}
                                                                >
                                                                    {recommendList.map((item, index) => (
                                                                        <div
                                                                            key={index}>
                                                                                <Suggestions id={"suggestion-list-item"}>
                                                                                        <StyledRecommend>
                                                                                            <img

                                                                                                onClick={() => personBtn(item)}
                                                                                                src={item.backdrop_path ? `https://media.themoviedb.org/t/p/w500_and_h282_face/${item.backdrop_path}.jpg` : logo} />
                                                                                        </StyledRecommend>

                                                                                        <Flex
                                                                                            justify={"space-between"}
                                                                                            id={"suggestions-title"}
                                                                                        >
                                                                                            <Text
                                                                                             fz={"sm"}
                                                                                             truncate={true}
                                                                                            >
                                                                                                {item.original_title || item.title}
                                                                                           </Text>
                                                                                            <Text
                                                                                                fz={"sm"}
                                                                                                truncate={true}
                                                                                            >
                                                                                                {`${(item.vote_average*10).toFixed(0)}%`}
                                                                                            </Text>
                                                                                        </Flex>

                                                                                </Suggestions>
                                                                        </div>
                                                                    ))}
                                                                </StyledCredits>
                                                            </CreditsWrap>
                                                    }
                                                </div>
                                            </StyledTrend>
                                        </SliderContent>
                                    </Container>
                                }
                    />


                </Container>
            </Container>

            <Footer/>
        </div>
    )

}




const HeaderLargeFirst = styled.div`
  padding-left: 90px;  
  border-bottom: 1px solid var(--primaryColor);
  background-position: left calc((50vw - 170px) - 340px) top;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 600px;
  display: flex;
  align-items: center;
  ${({ posterUrl }) => css`
    background-image: linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%), url(${posterUrl});
  `}
`;

const InnerContentCustomBg = styled.div`
  width: 100%;
  height: 100%;
  ${({ posterUrl }) => css`
    background-image: linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%), url(${posterUrl});
  `}
  min-height: 600px;
  display: flex;
  flex-direction: column;
  
`;

const StyledPoster = styled.div`
  border-width: 0;
  width: 365px;
  height: 534px;
  overflow: hidden;
  border-radius: 13px;
  position: relative;  
 
    & img{
      display: block;
      width: 100%;
      min-width: 100%;
      height: 100%;
      min-height: 100%;
      border-width: 0;
      outline: 0;
      object-fit: cover;
      transition: filter 0.3s ease;
    }

  & img:hover{
    filter: blur(5px);
  }


  .overlay {
    cursor: pointer;   
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease; 
  }

  &:hover .overlay {
    opacity: 1; 
  }
`

const StyledList = styled.div`
  color: #ffffff;
  padding: 100px 0;
  max-width: 740px; 
`
const Wrappers = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
`
const Title = styled.div`
  font-size: 35.2px;
`
const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    &  div:first-child{
      gap: 8px;
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
  & div:first-child::before {
    content: "";
    display: inline-block;
    background: #ffffff;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
    
  &  div:nth-child(2){
    gap:8px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  & div:nth-child(2)::before {
    content: "";
    display: inline-block;
    background: #ffffff;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`

const ContentList = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    
    & > div:nth-child(2){
      width: 70px;
      white-space: pre-line;
    }
  
`

const StyledIcons = styled.div `
  display: flex;
  align-items: center;
  gap: 15px;
  padding-left: 30px;
  cursor: pointer;
`
const StyledPlay = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
 
`
const FragmentModal = styled.div`
  iframe{
    width: 100%;
    height: calc(100vh - 160px);
  }
`

const TagLine = styled.div`
  opacity: .7;
  padding-top: 20px;
  font-family: "Poppins", sans-serif;
  font-style: italic;
`
const StyleGenres = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyleOverview = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;
  & div:first-child{
    
    font-size: 1.3em;
  }
  & div:nth-child(2){
    max-width: 970px;
  }
`
const TrendingContainer = styled.div`
  background-image: url(${trending});
  background-position: center;
  width: 100%;
  height: 338px;
  background-repeat: no-repeat;
  display: flex;
  background-position-y: 90px;
  justify-content: center;
`;

const CardStyle = styled.div`
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  width: 100%;
  min-height: calc(150px*1.5);
  height: calc(150px*1.5);
  margin: 8px -20px 8px 40px;
  z-index: 9; 
    
 .movie-text{
        min-height:100px;
        text-align: center;
        padding: 10px 0;
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

const Suggestions = styled.div`
    min-width: 150px;
    width: 100%;
    min-height: calc(130px*1.5);
    height: calc(130px*1.5);
    z-index: 9;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledImage = styled.div`
  position: relative;
  display: inline-block;
  min-height: 230px;
`;
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const StyledRecommend = styled.div`
    top: 0;
    left: 0;
    width: 250px;
    height: 141px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
  }
`;

const StyledMovie = styled.div`
  animation: ${fadeIn} 2s ease;
  transition: transform 0.3s ease;
  box-shadow:0 2px 8px rgba(0,0,0,.1);
`;
const StyledTrend = styled.div`
.wrap-list{
  gap: 30px;
  font-size: 1.2em;
  color: #000000;
}
`

const SliderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 30px 0;
  gap: 20px;
  color: #ffffff;
  position: relative;
  
  &:after{
    content: "";
    transition: linear .3s;
    opacity: 1;
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right,rgba(255,255,255,0)0,#fff 100%);
    will-change: opacity;
    pointer-events: none;
    z-index: 99;
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

const StyledCredits = styled.div`
  display: flex;
  gap: ${({gap}) => gap ? gap : "5px"};
  max-width: 990px;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: ${({minHeight}) => minHeight ? minHeight : "380px"};
`
const CreditsWrap = styled.div`
  font-weight: 600;
`

const LeadActors = styled.div`
  font-weight: 600;
  font-size: 1.4em;
  padding: 0 0 20px 0;
`
const StyledReviews = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  color: #000;
  border: 1px solid rgba(128, 128, 128, 0.18);
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
`
const WrapNames = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Argument = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  padding-top: 20px;
  cursor: pointer;
`

const  StyledMenu = styled.div`
    padding: 30px 10px;
`

const RightTopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledBefore = styled.div`
  display: flex;
  align-items: center;
  
  &:before{
    content: "";
    display: flex;
    border-left: 1px solid #d7d7d7;
    width: 10px;
    height: 30px;
  }
`
const RightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 10px;
  
  .title{
    font-weight: 600;
  }
  .text{
    font-weight: 300; 
  }
`
const WrapKeywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
`
const KeywordText = styled.span`
  text-transform: lowercase;
  font-size:12px;
  font-weight: 400;
`

const Evaluation = styled.div`
  padding: 10px 0;
  font-weight: 400;
  font-size: 14px;
`
const PopularImage = styled.div`
    & img{
      width: 533px;
      min-width: 533px;
      height: 300px;
      min-height: 342px;
    }

`

const StyledMedia = styled.div`
      position: relative;
  &:after{
    content: "";
    transition: linear .3s;
    opacity: 1;
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right,rgba(255,255,255,0)0,#fff 100%);
    will-change: opacity;
    pointer-events: none;
    z-index: 99;
  }
`
const StyledSticker = styled.div`
  padding: 0 10px;
`
export default Details