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
import trending from "../../assests/image/trending-bg.svg";
import CustomButton from "../../components/atoms/CustomButton";
import {IconChevronRight, IconBrandInstagram, IconGauge, IconFingerprint, IconActivity} from '@tabler/icons-react';
import moment from 'moment';
import Footer from "../../components/organisms/Footer/Footer";
import { IconPoint } from '@tabler/icons-react';
import Tooltip from "../../components/atoms/Tooltip";
import SearchBar from "../../components/molecules/SearchBar";
import NavLinks from "../../components/atoms/NavLinks";
import Badge from "../../components/atoms/Badge";
import Images from "../../components/atoms/Images";
import NoImage from "../../assests/image/glyphicons.svg"


const Search = ({}) => {
    const[personList,setPersonList] = useState([])
    const[personImages,setpersonImages] = useState([])
    const[totalFilms,setTotalFilms] = useState([])
    const [loading,setLoading] = useState(false)
    const { personId } = useParams();
    const { t } = useTranslation();
    const navigate =  useNavigate()
    const langs = useParams()
    const [showFullText, setShowFullText] = useState(false);
    const MAX_LENGTH = 500;
    const lang = langs.lang
    const location = useLocation()
    const searchList = location.state.searchList || []



    useEffect(() => {
        console.log("localtion",location)

    },[])


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


    return(
            <>
                <Header/>
                <SearchBar/>
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

                    <Flex
                        wrap={"wrap"}
                        w={"100%"}
                        gap={"20px"}
                    >
                        {
                            searchList.length > 0 ? (
                                loading ? (
                                    <div>loading</div>
                                ) : (
                                    searchList.map((item, index) => (

                                     <Flex
                                     alignItems="center"
                                     w={"100%"}
                                     mih={"135px"}

                                     >
                                         <Box
                                             maw={90}
                                             mx="auto"
                                             bg={item.poster_path ? "": "#dbdbdb"}
                                             mah={"135px"}
                                         >
                                             <Images
                                                 fit="cover"
                                                 radius="6px 0 0 6px"
                                                 src={item.poster_path ? `https://media.themoviedb.org/t/p/w500/${item.poster_path}.jpg` : NoImage}
                                                 style={{
                                                     width: '90px',
                                                     height: '135px',
                                                     minWidth: '90px',
                                                     minHeight: '135px',
                                                 }}
                                             />
                                         </Box>
                                         <Card
                                             key={index}
                                             display={"flex"}
                                             component="a"
                                             target="_blank"
                                             w={"100%"}
                                             m={"0 0 8px 0"}
                                             p={"0"}
                                             style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"}}
                                             mih={"135px"}
                                         >
                                             <Flex
                                                 w={"100%"}
                                             >

                                                 <Flex
                                                     direction={"column"}
                                                     p={"md"}
                                                 >
                                                     <Text
                                                         fw={"700"}
                                                         fz={"18px"}
                                                     >{item.title}
                                                     </Text>

                                                     <Text
                                                         fw={"400"}
                                                         color="dimmed"
                                                         fz={"xs"}
                                                     >
                                                         {item.release_date}
                                                     </Text>

                                                     <Text
                                                         lineClamp={2}
                                                         mt="xs"
                                                         size="sm">
                                                         {item.overview}
                                                     </Text>
                                                 </Flex>
                                             </Flex>
                                         </Card>
                                     </Flex>


                                    ))
                                )
                            ) : (
                                <div>data yok</div>
                            )
                        }
                    </Flex>



                </Container>
                <Footer/>
            </>
        )
}


const Title = styled.div`
  font-size:28px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #000;
`
const SubTitle = styled.div`
  font-weight: 600;
  font-size: 1.3em;
  line-height: 50px;
  font-family: "Source Sans Pro",Arial,sans-serif;
`
const SubText = styled.div`
  font-size: 14px;
  font-family: "Source Sans Pro",Arial,sans-serif;
`

const SliderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
const StyledTextLoader = styled.div`
  display: flex;
  flex-direction: column;
  gap:5px;
`
const StyledCredits = styled.div`
  display: flex;
  gap: 15px;
  max-width: 990px;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: 330px;
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
const LeadActors = styled.div`
  font-weight: 600;
  font-size: 1.0em;
  padding: 0 0 20px 0;
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

const StyledMovie = styled.div`
  animation: ${fadeIn} 2s ease;
  transition: transform 0.3s ease;
`;


const CardStyle = styled.div`
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  width: 100%;
  min-height: calc(150px*1.5);
  height: calc(150px*1.5);
  z-index: 9;
  cursor: pointer;
  .movie-text{
    padding: 10px 0;
    text-align: center;
    font-family:"Source Sans Pro", Arial, sans-serif ;
  }
  
  .movie-text div:nth-child(1){
    color: #000;
    font-size: 12px;
    font-weight: 500;
  }

  .movie-text div:nth-child(1):hover{
    color:#01b4e4;
  }


  
  & img{
    border-radius: 8px;
    height: auto;
  }
;
`
const TrendingContainer = styled.div`
  background-image: url(${trending});
  background-position: center;
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  display: flex;
  background-position-y: 90px;
  justify-content: center;
`;

const CreditsWrap = styled.div`
  font-weight: 600;
`
export default Search