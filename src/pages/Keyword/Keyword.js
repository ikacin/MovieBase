import {Box, Card, Container, Flex, Text} from "@mantine/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import ActionHeader from "../../components/organisms/Header/ActionHeader";
import CustomSkeleton from "../../components/atoms/Skeleton";
import DataNotFound from "../../components/atoms/DataNotFound";
import Divider from "../../components/atoms/Divider";
import Images from "../../components/atoms/Images";
import NoImage from "../../assests/image/glyphicons.svg";
import Footer from "../../components/organisms/Footer/Footer";

const Keyword = () => {
    const [loading, setLoading] = useState(true);
    const [keywordList, setKeywordList] = useState({});
    const [totalKeywords, setTotalKeywords] = useState("0");
    const [keywordDetails, setKeywordDetails] = useState({});
    const { keyword_id } = useParams();





    const getKeywordDetails = async (keyword_id) => {
        setLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis",
            },
        };
        try {
            const response = await Axios.get(
                `https://api.themoviedb.org/3/keyword/${keyword_id}`,
                options
            );
            console.log("keywordDetails", response.data);
            setKeywordDetails(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    const getSearchKeywords = async (keyword_id) => {
        setLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis",
            },
        };
        try {
            const response = await Axios.get(
                `https://api.themoviedb.org/3/keyword/${keyword_id}/movies`,
                options
            );
            console.log("keyword", response.data);
            setKeywordList(response.data.results);
            setTotalKeywords(response.data.total_results)
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getKeywordDetails(keyword_id);
        getSearchKeywords(keyword_id)
    },[keyword_id])



    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>

            <Header/>

            <ActionHeader
                content={keywordDetails.name ? keywordDetails.name : "-"}
                count={totalKeywords ? `${totalKeywords} film` : "0"}
            />

            <SubHeader/>
            <Divider/>
            <Container
                size={"xl"}
                my={"xl"}
                p={0}
                style={{
                    flex: 1,
                    width: "100%",
                    padding: "20px",
                }}
            >
                <Flex
                    direction={"column"}
                    gap={"xl"}
                >
                    {keywordList.length > 0 ? (
                            keywordList.map((item, index) => (
                                loading ? (
                                    <Flex
                                        key={index}
                                        direction="column"
                                    >
                                        <CustomSkeleton
                                            key={index}
                                            radius="md"
                                            heights={["calc(65px * 1.5)"]}
                                            widths={["100%"]}
                                        />
                                    </Flex>
                                ) : (

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
                                            }}
                                            mih="135px"
                                        >
                                            <Flex w="100%">
                                                <Flex direction="column" p="md">
                                                    <Text fw={700} fz="18px">
                                                        {item.original_title ? item.original_title : item.title}
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
                                )

                            ))
                        ) :
                        (
                            <DataNotFound/>
                        )

                    }
                </Flex>
            </Container>
            <Footer/>

        </div>
    );
};

export default Keyword;
