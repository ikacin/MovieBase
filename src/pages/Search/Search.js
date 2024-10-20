import Axios from "axios";
import React,{useEffect,useState} from "react";
import {useParams,useNavigate,useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import {Container, Flex, Image, Text, List, Card, Box} from "@mantine/core";
import CustomDivider from "../../components/atoms/Divider";
import logo from "../../assests/image/no-image-.png";
import {useTranslation} from "react-i18next";
import styled, { keyframes} from 'styled-components';
import CustomSkeleton from "../../components/atoms/Skeleton";
import {IconGauge, IconFingerprint, IconActivity} from '@tabler/icons-react';
import Footer from "../../components/organisms/Footer/Footer";
import SearchBar from "../../components/molecules/SearchBar";
import NavLinks from "../../components/atoms/NavLinks";
import Badge from "../../components/atoms/Badge";
import Images from "../../components/atoms/Images";
import NoImage from "../../assests/image/glyphicons.svg"
import DataNotFound from "../../components/atoms/DataNotFound";


const Search = ({}) => {
    const { t } = useTranslation();
    const navigate =  useNavigate()
    const langs = useParams()
    const lang = langs.lang
    const location = useLocation()
    const searchData = location.state.searchList || []
    const getParams = new URLSearchParams(location.search);
    const queryParams = getParams.get('query');
    const[searchText, setSearchText] = useState(queryParams || "");
    const[searchList, setSearchList] = useState(searchData || []);
    const[loading, setLoading] = useState(false);

    const Links = [
        {
            icon: IconGauge,
            label: 'Diziler',
            rightSection:<Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fff"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                         >10
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Fimler',
            rightSection: <Badge
                    padding={"0 8px"}
                    radius={"md"}
                    size={"lg"}
                    background={"#fff"}
                    text={
                        <Text
                            fw={"400"}
                            c={"#000"}
                        >10
                        </Text>
                    }
                />
        },
        {
            icon: IconActivity,
            label: 'Kişiler',
            rightSection: <Badge
                    padding={"0 8px"}
                    radius={"md"}
                    size={"lg"}
                    background={"#fff"}
                    text={
                        <Text
                            fw={"400"}
                            c={"#000"}
                        >10
                        </Text>
                    }
                />
        },
        {
            icon: IconFingerprint,
            label: 'Koleksiyonlar',
            rightSection: <Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fff"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >10
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Anahtar Kelimeler',
            rightSection:<Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fff"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >10
                    </Text>
                }
            />
        },
        {
            icon: IconFingerprint,
            label: 'Şirketler',
            rightSection: <Badge
                padding={"0 8px"}
                radius={"md"}
                size={"lg"}
                background={"#fff"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >10
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
                background={"#fff"}
                text={
                    <Text
                        fw={"400"}
                        c={"#000"}
                    >10
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
            const response = await Axios.get(`https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=1`, options);
            console.log("searchPage", response.data);
            setSearchList(response.data.results);

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
        }
    })


    useEffect(() => {
        setSearchText(queryParams || "");
    }, [queryParams]);

    return(
            <>
                <Header/>
                <SearchBar
                value={searchText}
                setValue={setSearchText}
                onKeyDown={(e) => handleKeyDown(e)}
                variant={"unstyled"}
                />

                <CustomDivider/>
                <Container
                    mb={"40px"}
                    mt={"40px"}
                    px={"60px"}
                    size={"xl"}
                    display={"flex"}
                    style={{gap:"30px"}}
                >
               <Flex
               direction={"column"}
               >
                   <Badge
                   radius={"10px 10px 0 0"}
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
                   />
               </Flex>

                    <Flex wrap="wrap" w="100%" gap="20px">
                        {searchList.length > 0 ? (
                            loading ? (
                                <Flex direction="column">
                                    {searchList.map((item, index) => (
                                        <CustomSkeleton
                                            key={index}
                                            radius="md"
                                            heights={["calc(65px * 1.5)"]}
                                            widths={["900px"]}
                                        />
                                    ))}
                                </Flex>
                            ) : (
                                searchList.map((item, index) => (
                                    <Flex key={index} alignItems="center" w="100%" mih="135px">
                                        <Box
                                            maw={90}
                                            mx="auto"
                                            bg={item.poster_path ? "" : "#dbdbdb"}
                                            mah="135px"
                                        >
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
                                                        {item.title}
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
                                ))
                            )
                        ) : (
                            <DataNotFound />
                        )}
                    </Flex>




                </Container>
                <Footer/>
            </>
        )
}



export default Search