import {Container, Flex, Text} from "@mantine/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import ActionHeader from "../../components/organisms/Header/ActionHeader";
import CustomSkeleton from "../../components/atoms/Skeleton";
import DataNotFound from "../../components/atoms/DataNotFound";
import Divider from "../../components/atoms/Divider";
import Footer from "../../components/organisms/Footer/Footer";

const Company = () => {
    const [loading, setLoading] = useState(true);
    const [companyList, setCompanyList] = useState({});
    const { company_id } = useParams();

    const getSearchCompany = async (company_id) => {
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
                `https://api.themoviedb.org/3/company/${company_id}`,
                options
            );
            console.log("company", response.data);
            setCompanyList(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getSearchCompany(company_id)
    },[company_id])

    const areAllFieldsFilled = (data) => {
        return Object.values(data).every(value => value !== "" && value !== null)
    }


    return (
        <>
            <Header />

            <ActionHeader
                content={companyList?.name}
                count={companyList?.description ? companyList.description : "0"}
            />

            <SubHeader />
            <Divider/>
            <Container
                size={"xl"}
                my={ "xl"}
                p={0}
            >

                {loading ? (
                    <Flex direction="column">
                        <CustomSkeleton
                            radius="md"
                            heights={["calc(65px * 1.5)"]}
                            widths={["100%"]}
                        />
                    </Flex>
                ) : areAllFieldsFilled(companyList) ? (
                    <Flex>
                        <Text>{companyList?.name}</Text>
                    </Flex>
                ) : (
                    <DataNotFound />
                )}
            </Container>
            <Footer/>
        </>
    );
};

export default Company;
