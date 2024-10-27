import Axios from "axios";
import React,{useEffect,useState} from "react";
import {useParams,useNavigate,useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import {Container, Flex, Text, Card, Box} from "@mantine/core";
import Dividers from "../../components/atoms/Divider";
import {useTranslation} from "react-i18next";
import CustomSkeleton from "../../components/atoms/Skeleton";
import {IconGauge, IconFingerprint, IconActivity} from '@tabler/icons-react';
import Footer from "../../components/organisms/Footer/Footer";
import SearchBar from "../../components/molecules/SearchBar";
import NavLinks from "../../components/atoms/NavLinks";
import Badge from "../../components/atoms/Badge";
import Images from "../../components/atoms/Images";
import NoImage from "../../assests/image/glyphicons.svg"
import NoUserImage from "../../assests/image/user-icon.svg"
import DataNotFound from "../../components/atoms/DataNotFound";
import styled from "styled-components";




const Search = ({}) => {
    const { t } = useTranslation();
    const navigate =  useNavigate()
    const langs = useParams()
    const lang = langs.lang
    const location = useLocation()
    const getParams = new URLSearchParams(location.search);
    const queryParams = getParams.get('query');
    const[searchText, setSearchText] = useState( queryParams);
    const[searchList, setSearchList] = useState( []);
    const[searchKeywords, setSearchKeywords] = useState( {});
    const[searchCollection, setSearchCollection] = useState( []);
    const[searchCompany, setSearchCompany] = useState( []);
    const[collectionTotal, setCollectionTotal] = useState( 0);
    const[keywordsTotal, setKeywordsTotal] = useState( 0);
    const[companyTotal, setCompanyTotal] = useState( 0);
    const[loading, setLoading] = useState(false);
    const [active, setActive] = useState("tv");
    const isSearchPath = location.pathname.includes('search');
    const Links = [
        {
            icon: IconGauge,
            label: 'Diziler',
            media_type: 'tv',
            rightSection:<Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fcf7f7"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                         >{searchList?.filter(i => i.media_type === "tv").length}
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Fimler',
            media_type: 'movie',
            rightSection: <Badge
                    padding={"0 8px"}
                    radius={"md"}
                    size={"lg"}
                    background={"#fcf7f7"}
                    text={
                        <Text
                            fw={"400"}
                            c={"#000"}
                        >{searchList?.filter(i => i.media_type === "movie").length}
                        </Text>
                    }
                />
        },
        {
            icon: IconActivity,
            label: 'Kişiler',
            media_type: 'person',
            rightSection: <Badge
                    padding={"0 8px"}
                    radius={"md"}
                    size={"lg"}
                    background={"#fcf7f7"}
                    text={
                        <Text
                            fw={"400"}
                            c={"#000"}
                        >{searchList?.filter(i => i.media_type === "person").length}
                        </Text>
                    }
                />
        },
        {
            icon: IconFingerprint,
            label: 'Koleksiyonlar',
            media_type: "collections",
            rightSection: <Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fcf7f7"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >{collectionTotal ? collectionTotal : "0"}
                    </Text>
                }
        />
        },
        {
            icon: IconFingerprint,
            label: 'Anahtar Kelimeler',
            media_type: "keywords",
            rightSection:<Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fcf7f7"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >{keywordsTotal ? keywordsTotal : "0"}
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Şirketler',
            media_type: "companies",
            rightSection: <Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fcf7f7"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >{companyTotal ? companyTotal : "0"}
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Ağlar',
            rightSection: <Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fcf7f7"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >0
                    </Text>
                }
            />
        },
    ];


    const getSearch = async (params) => {
        setLoading(true);
        cleanSearchTerm(params)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/search/multi?query=${params}&include_adult=false&language=en-US&page=1`, options);
            console.log("searchPage", response.data);
            setSearchList(response.data.results);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    const getSearchCollection = async (params) => {
        setLoading(true);
        cleanSearchTerm(params)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/search/collection?query=${params}&include_adult=false&language=en-US&page=1`, options);
            console.log("searchCollection", response.data);
            setSearchCollection(response.data.results);
            setCollectionTotal(response.data.total_results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const getSearchKeywords = async (params) => {
        setLoading(true);
        cleanSearchTerm(params)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/search/keyword?query=${params}&include_adult=false&language=en-US&page=1`, options);
            console.log("searchKeywords", response.data);
            setSearchKeywords(response.data.results);
            setKeywordsTotal(response.data.total_results)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const getSearchCompany = async (params) => {
        setLoading(true);
        cleanSearchTerm(params)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/search/company?query=${params}&include_adult=false&language=en-US&page=1`, options);
            console.log("searchCompany", response.data);
            setSearchCompany(response.data.results);
            setCompanyTotal(response.data.total_results)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };





    const cleanSearchTerm = (searchTerm) => {
        return searchTerm?.toLowerCase()?.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    };

    const handleKeyDown = ((event) => {
        if(event.key === 'Enter') {

            getSearch(searchText)
            getSearchCollection(searchText)
            getSearchKeywords(searchText)
            getSearchCompany(searchText)

            const newParams = new URLSearchParams();
            newParams.set('query',searchText);
            navigate(`${location.pathname}?${newParams}`);
        }
    })

    useEffect(() => {
        if (queryParams !== searchText) {
            setSearchText(searchText || '');
        }
    }, [queryParams]);



    useEffect(() => {
        getSearch(queryParams)
        getSearchCollection(queryParams)
        getSearchKeywords(queryParams)
        getSearchCompany(queryParams)
    },[])


    const ClickedCompanies = (id) => {
        navigate(`/${lang}/company/${id}/movie`);
    }

    const ClickedKeyword = (id)  => {
        navigate(`/${lang}/keyword/${id}/movie`);
    }

    const ClickedPerson = (id) => {
        navigate(`/${lang}/person/${id}`);
    }

    const ClickedMovie = (id) => {
        navigate(`/${lang}/movie/${id}`);
    }


    const ClickedTv = (id) => {
        navigate(`/${lang}/tv/${id}`);
    }

    const ClickedCollection = (id) => {
        navigate(`/${lang}/collection/${id}`);
    }

    return(
            <>
                <Header/>
                <SearchBar
                value={searchText}
                setValue={setSearchText}
                onKeyDown={(e) => handleKeyDown(e)}
                variant={"unstyled"}
                />

                <Dividers/>
                <Container
                    mb={"40px"}
                    mt={"40px"}
                    p={0}
                    size={"xl"}
                    display={"flex"}
                    style={{gap:"30px"}}
                >
               <Flex
               direction={"column"}
               >
                   <Badge
                   radius={"8px 8px 0 0"}
                   background={"#4bb4e4"}
                   padding={"30px 60px"}
                   text={
                       <Text
                      ta={"left"}
                      tt={"capitalize"}
                       fw={"600"}
                       size={"md"}
                       >Arama Sonuçları</Text>
                   }
                   color={"#fff"}
                   />

                   <NavLinks
                       fontWeight={"500"}
                       fontSize={"14px"}
                       padding={"5px 0"}
                       gap={"10px"}
                       border={"1px solid #ececec"}
                       data={Links}
                       active={active}
                       setActive={(index) => setActive(Links[index].media_type)}
                   />
               </Flex>
                    {(active === 'tv' || active === 'movie' || active === 'person') ? (
                        <div>
                            <Flex wrap="wrap" w="100%" gap={active === 'person' ? "10px" : "20px"}>
                                {searchList?.filter(item => item.media_type === active)
                                    .map((item, index) => (
                                            loading ? (
                                                    <Flex direction="column">
                                                            <CustomSkeleton
                                                                key={index}
                                                                radius="md"
                                                                heights={["calc(65px * 1.5)"]}
                                                                widths={["900px"]}
                                                            />
                                                    </Flex>

                                            ):active === 'person' ? (
                                                <Flex key={index}
                                                      align={"center"}
                                                      w="100%"
                                                      gap={"10px"}
                                                      onClick={() => ClickedPerson(item.id)}
                                                      style={{cursor: "pointer"}}
                                                >
                                                    <Box
                                                        mx="auto"
                                                    >
                                                        {
                                                            item.profile_path ? (
                                                                <StyledImage
                                                                    backgroundSize={"55px"}
                                                                    background={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.profile_path}.jpg`} />
                                                            ) : (
                                                                <StyledImage
                                                                backgroundSize={"50px"}
                                                                />
                                                            )
                                                        }

                                                    </Box>
                                                    <Card
                                                        component="a"
                                                        target="_blank"
                                                        w="100%"
                                                        p="0"
                                                        m="0 0 0 0"

                                                    >
                                                        <Flex
                                                            w="100%"
                                                        >
                                                            <Flex
                                                                direction="column"
                                                            >
                                                                <Text fw={700} fz="18px">
                                                                    {item.original_name || item.title}
                                                                </Text>
                                                                <Flex
                                                                align={"center"}
                                                                gap={"5px"}
                                                                >
                                                                    <Text fw={400}
                                                                          fz="md"
                                                                    >
                                                                        {item.known_for_department || "-"}
                                                                    </Text>
                                                                    <Dividers
                                                                        orientation="vertical"
                                                                        size={"sm"}
                                                                    />
                                                                    <Flex
                                                                    align={"center"}
                                                                    >
                                                                        {item.known_for && item.known_for.length > 0 ? (
                                                                                item.known_for.map((item,index) => (

                                                                                        <Text
                                                                                            key={index}
                                                                                            fw={400}
                                                                                            color="dimmed"
                                                                                            fz="md"
                                                                                        >
                                                                                            {item.original_name || item.title}
                                                                                        </Text>
                                                                                ))
                                                                            )
                                                                            :
                                                                            <Text fw={400} color="dimmed" fz="xs">
                                                                                Data Bulunamadı
                                                                            </Text>
                                                                        }
                                                                    </Flex>

                                                                </Flex>
                                                                <Text lineClamp={2} mt="xs" size="sm">
                                                                    {item.overview}
                                                                </Text>
                                                            </Flex>
                                                        </Flex>
                                                    </Card>
                                                </Flex>
                                            ):
                                                <Flex key={index} alignItems="center" w="100%" mih="135px">
                                                    <Box maw={90} mx="auto" bg={item.poster_path ? "" : "#dbdbdb"} mah="135px">
                                                        <Images
                                                            fit="cover"
                                                            radius="6px 0 0 6px"
                                                            src={
                                                                item.poster_path
                                                                    ? `https://media.themoviedb.org/t/p/w500/${item.poster_path}.jpg`
                                                                    : NoImage
                                                            }
                                                            style={{
                                                                width: "90px",
                                                                height: "135px",
                                                                minWidth: "90px",
                                                                minHeight: "135px",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Card
                                                        component="a"
                                                        target="_blank"
                                                        w="100%"
                                                        m="0 0 8px 0"
                                                        p="0"
                                                        style={{
                                                            boxShadow:
                                                                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                                            cursor: "pointer",
                                                        }}
                                                        mih="135px"
                                                        onClick={() => {
                                                            if (active === 'movie') {
                                                                ClickedMovie(item.id)
                                                            }else if (active === 'tv') {
                                                                ClickedTv(item.id)
                                                            }
                                                        }}
                                                    >
                                                        <Flex w="100%">
                                                            <Flex direction="column" p="md">
                                                                <Text fw={700} fz="18px">
                                                                    {item.original_name || item.title}
                                                                </Text>
                                                                <Text fw={400} color="dimmed" fz="xs">
                                                                    {item.release_date}
                                                                </Text>
                                                                <Text lineClamp={2} mt="xs" size="sm">
                                                                    {item.overview}
                                                                </Text>
                                                            </Flex>
                                                        </Flex>
                                                    </Card>
                                                </Flex>
                                    ))}
                            </Flex>
                        </div>
                    ) : active === "keywords"
                    && searchKeywords?.length > 0 ? (
                        <Flex
                            direction={"column"}
                        >
                            {searchKeywords?.map((item, index) => (
                                loading ? (
                                        <Flex direction="column">
                                            <CustomSkeleton
                                                key={index}
                                                radius="md"
                                                heights={["calc(65px * 1.5)"]}
                                                widths={["900px"]}
                                            />
                                        </Flex>
                                    ):

                                    <Text
                                        style={{cursor:"pointer"}}
                                        key={index}
                                        fw={400}
                                        fz={"md"}
                                        onClick={() => ClickedKeyword(item.id)}
                                    >
                                        {item.name}
                                    </Text>
                            ))}
                        </Flex>
                    ) : active === "collections" && searchCollection?.length > 0 ? (
                        <Flex direction={"column"}>
                            {searchCollection?.map((item, index) => (
                                loading ? (
                                        <Flex direction="column">
                                            <CustomSkeleton
                                                key={index}
                                                radius="md"
                                                heights={["calc(65px * 1.5)"]}
                                                widths={["900px"]}
                                            />
                                        </Flex>
                                    )
                                    :

                                <Flex
                                    key={index}
                                    alignItems="center"
                                    w="100%"
                                    mih="135px"
                                    onClick={() => ClickedCollection(item.id)}
                                    style={{cursor: "pointer"}}
                                >
                                    <Box maw={90} mx="auto" bg={item.poster_path ? "" : "#dbdbdb"} mah="135px">
                                        <Images
                                            fit="cover"
                                            radius="6px 0 0 6px"
                                            src={
                                                item.poster_path
                                                    ? `https://media.themoviedb.org/t/p/w500/${item.poster_path}.jpg`
                                                    : NoImage
                                            }
                                            style={{
                                                width: "90px",
                                                height: "135px",
                                                minWidth: "90px",
                                                minHeight: "135px",
                                            }}
                                        />
                                    </Box>
                                    <Card
                                        component="a"
                                        target="_blank"
                                        w="100%"
                                        m="0 0 8px 0"
                                        p="0"
                                        style={{
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                        }}
                                        mih="135px"
                                    >
                                        <Flex w="100%">
                                            <Flex direction="column" p="md">
                                                <Text fw={700} fz="18px">
                                                    {item.original_name}
                                                </Text>
                                                <Text fw={400} color="dimmed" fz="xs">
                                                    {item.release_date}
                                                </Text>
                                                <Text lineClamp={2} mt="xs" size="sm">
                                                    {item.overview}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                </Flex>
                            ))}
                        </Flex>
                    )
                    :   active === "companies" && searchCompany?.length > 0 ? (
                                <Flex
                                    direction={"column"}
                                    w={"100%"}
                                    gap={"md"}
                                >
                                    {searchCompany?.map((item, index) => (
                                        loading ? (
                                                <Flex direction="column">
                                                    <CustomSkeleton
                                                        key={index}
                                                        radius="md"
                                                        heights={["calc(65px * 1.5)"]}
                                                        widths={["900px"]}
                                                    />
                                                </Flex>
                                            ):
                                            <Flex direction="column"
                                                w="100%"
                                            >
                                                    <Text
                                                        onClick={() => ClickedCompanies(item.id)}
                                                        key={index}
                                                        fw={400}
                                                        fz={"md"}>
                                                        {item.name}
                                                    </Text>
                                                <Dividers
                                                color="#ececec"
                                                />
                                            </Flex>
                                    ))}
                                </Flex>
                        )
                            :
                        (
                           <DataNotFound/>
                        )
                    }
                </Container>
                <Footer/>
            </>
        )
}


const StyledImage = styled.div`
    background: ${({ background }) => background ? `url(${background})` : `url(${NoUserImage})`}#dbdbdb center no-repeat;
    background-size:${({backgroundSize}) => backgroundSize};
    width: 70px;
    height: 70px;
    border-radius: 6px;
`


export default Search