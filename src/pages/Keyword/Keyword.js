import React, { useEffect, useState } from "react";
import { Box, Card, Container, Flex, Text } from "@mantine/core";
import { useHover } from '@mantine/hooks';
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import ActionHeader from "../../components/organisms/Header/ActionHeader";
import CustomSkeleton from "../../components/atoms/Skeleton";
import DataNotFound from "../../components/atoms/DataNotFound";
import Divider from "../../components/atoms/Divider";
import Images from "../../components/atoms/Images";
import Footer from "../../components/organisms/Footer/Footer";
import NoImage from "../../assests/image/glyphicons.svg";
import CustomButton from "../../components/atoms/CustomButton";

const Keyword = () => {
    const [loading, setLoading] = useState(false);
    const [keywordList, setKeywordList] = useState([]);
    const [totalKeywords, setTotalKeywords] = useState("0");
    const [keywordDetails, setKeywordDetails] = useState({});
    const [page, setPage] = useState(1);
    const { keyword_id } = useParams();
    const { lang } = useParams();
    const navigate = useNavigate();
    const { hovered, ref } = useHover();
    const languageCode = lang === "tr" ? "tr-TR" : "en-US";
    const getKeywordDetails = async (keyword_id) => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
        };
        try {
            const response = await Axios.get(
                `https://api.themoviedb.org/3/keyword/${keyword_id}`,
                options
            );
            console.log("keywordDetails", response.data);
            setKeywordDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getSearchKeywords = async (keyword_id, page) => {
        setLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
        };
        try {
            const response = await Axios.get(
                `https://api.themoviedb.org/3/keyword/${keyword_id}/movies?include_adult=false&language=${languageCode}&page=${page}`,
                options
            );
            console.log("keyword", response.data);
            setKeywordList(prevList => [...prevList, ...response.data.results]);
            setTotalKeywords(response.data.total_results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getKeywordDetails(keyword_id);
        getSearchKeywords(keyword_id, page);
    }, [keyword_id, page]);

    const ClickedMovie = (id) => {
        navigate(`/${lang}/movie/${id}`);
    };

    const MorePage = () => {
        const newPage = page + 1;
        setPage(newPage);
        getSearchKeywords(keyword_id, newPage);
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page',newPage);
        window.history.pushState({},'',`?${queryParams.toString()}`)
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Header />
            <ActionHeader
                content={keywordDetails.name ? keywordDetails.name : "-"}
                count={totalKeywords ? `${totalKeywords} film` : "0"}
            />
            <SubHeader />
            <Divider />
            <Container
                size={"xl"}
                my={"xl"}
                p={0}
                style={{
                    flex: 1,
                    width: "100%",
                }}
            >
                <Flex direction={"column"} gap={"xl"}>
                    {loading ? (
                        <>
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                            <CustomSkeleton
                                radius="md"
                                heights={["calc(65px * 1.5)"]}
                                widths={["100%"]}
                            />
                        </>

                    ) : (
                        keywordList.length > 0 ? (
                            keywordList.map((item, index) => (
                                <Flex
                                    key={index}
                                    alignItems="center"
                                    w="100%"
                                    mih="135px"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => ClickedMovie(item.id)}
                                >
                                    <Box maw={90} mx="auto" bg={item.poster_path ? "" : "#dbdbdb"} mah="135px">
                                        <Images
                                            fit="cover"
                                            radius="6px 0 0 6px"
                                            src={
                                                item.poster_path
                                                    ? `https://media.themoviedb.org/t/p/w500/${item.poster_path}`
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
                                                <Text
                                                    fw={700}
                                                    fz="18px"
                                                    ref={ref}
                                                    color={hovered ? "black" : "blue"}
                                                >
                                                    {hovered ? item.original_title : item.title}
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
                        ) : (
                            <DataNotFound />
                        )
                    )}
                    {
                        page === 1 && (
                            <CustomButton
                                loading={loading}
                                height={"60px"}
                                leftIcon={false}
                                children={"Daha Fazla Yükle"}
                                background={"#23b7d9"}
                                hoverBackground={"#23b7d9"}
                                hoverColor={"#000"}
                                color={"#fff"}
                                radius={"6px"}
                                fontsize={"18px"}
                                onClick={MorePage}
                            />
                        )
                    }
                </Flex>
            </Container>
            <Footer />
        </div>
    );
};

export default Keyword;
