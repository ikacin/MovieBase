import Axios from "axios";
import React,{useEffect,useState} from "react";
import {useParams,useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import {Container, Flex,Image,Text,List,Card  } from "@mantine/core";
import CustomDivider from "../../components/atoms/Divider";
import logo from "../../assests/image/no-image-.png";
import {useTranslation} from "react-i18next";
import styled, { keyframes} from 'styled-components';
import CustomSkeleton from "../../components/atoms/Skeleton";
import trending from "../../assests/image/trending-bg.svg";
import CustomButton from "../../components/atoms/CustomButton";
import { IconChevronRight,IconBrandInstagram  } from '@tabler/icons-react';
import moment from 'moment';
import Footer from "../../components/organisms/Footer/Footer";
import { IconPoint } from '@tabler/icons-react';
import Tooltip from "../../components/atoms/Tooltip";
const Person = () => {
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
    const languageCode = lang === "tr" ? "tr-TR" : "en-US";
    const getPerson = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/person/${personId}?language=${languageCode}`, options);
            console.log("credits",response.data);
            setPersonList(response.data)

        } catch (error) {
            console.error(error);
        }  finally {

        }
    };



    const getImages = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits`, options);
            console.log("images",response.data);
            setpersonImages(response.data)
            setTotalFilms(response.data.cast.length)


        } catch (error) {
            console.error(error);
        }  finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getPerson()
        getImages()
    },[])


    const pageDetails = (item) => {
        navigate(`/${lang}/movie/${item.id}`);
    }

    const displayedText = showFullText ? personList.biography : personList.biography?.slice(0, MAX_LENGTH) + (personList?.biography?.length > MAX_LENGTH ? '...' : '');
    const handleToggleText = () => {
        setShowFullText(!showFullText);
    };
    return(
            <>
                <Header/>
                <SubHeader/>
                <CustomDivider/>
                <Container
                    style={{flexDirection:"column"}}
                    mb={"40px"}
                    mt={"40px"}
                    p={0}
                    size={"xl"}
                    display={"flex"}

                >
                   <Flex
                    justify={"flex-start"}
                    gap={"40px"}
                   >
                    <Flex
                    direction={"column"}
                    gap={"30px"}
                    >
                        <Image
                            maw={340}
                            miw={300}
                            mx="auto"
                            radius="md"
                            src={personList.profile_path ? `https://media.themoviedb.org/t/p/w220_and_h330_face/${personList.profile_path}.jpg` : logo}
                            alt="Random image"
                        />
                        <Flex
                        direction={"column"}
                        gap={"30px"}
                        >
                            <Tooltip
                                position="top-start"
                                label={"İnstagramı Ziyaret Edin"}
                                text={
                                <IconBrandInstagram stroke={2} size={"35px"}/>
                                  }
                            />

                            <Flex
                            direction={"column"}
                            gap={"20px"}
                            >
                                <Text fz={"xl"}  fw={800}>Kişisel Bilgi</Text>
                                <div>
                                    <Text fw={700}>Bilinen İşi</Text>
                                    <Text>{personList.known_for_department}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>Bilinen Filmleri</Text>
                                    <Text>{totalFilms}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>Cinsiyet</Text>
                                    <Text>{personList.gender === 2 ? "Erkek" : "Kadın"}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>Doğum Günü</Text>
                                    <Text> {moment(personList.birthday).add(10, 'days').calendar()}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>Doğum Yeri</Text>
                                    <Text>{personList.place_of_birth}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>Ayrıca Şöyle de Bilinir</Text>
                                    <Text>{personList.also_known_as && personList.also_known_as.lenght > 0 ? personList.also_known_as.join(',') : "-"}</Text>
                                </div>

                                <div>
                                    <Text fw={700}>İçerik Sonucu </Text>
                                    <Text>{personList.popularity}</Text>
                                </div>
                            </Flex>
                        </Flex>
                    </Flex>

                       <Flex
                           direction={"column"}
                           gap={"20px"}
                       >
                           <Title>
                               {personList.name}
                           </Title>
                           <div>
                               <SubTitle>
                                   {t("biography")}
                               </SubTitle>
                               <SubText>{displayedText}</SubText>
                               {personList?.biography?.length > MAX_LENGTH && (
                                   <CustomButton
                                       padding={0}
                                       color={"#01b4e4"}
                                       leftIcon={<IconChevronRight stroke={2} size={"18px"} />}
                                       onClick={handleToggleText}
                                       variant="link"
                                   >
                                       {showFullText ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                                   </CustomButton>
                               )}

                           </div>

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
                                                   <LeadActors>Bilinen İşi</LeadActors>
                                                   <StyledCredits>

                                                       {personImages?.cast?.map((item, index) => (

                                                           <div key={index}>
                                                               <TrendingContainer>
                                                                   <CardStyle id={"card-style-first"}>
                                                                       <StyledMovie>
                                                                           <StyledImage>
                                                                               <img
                                                                                   alt="logo"
                                                                                   onClick={() => pageDetails(item)} src={item.poster_path ? `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg` : logo}
                                                                               />
                                                                           </StyledImage>
                                                                           <div className={"movie-text"}>
                                                                               <div>{item.title}</div>
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

                           <Flex
                            gap={"20px"}
                            direction={"column"}
                           >
                               <Text fw={600}>Oyunculuk</Text>
                              <Flex
                                gap={"10px"}
                                direction={"column"}
                              >
                                  {

                                      loading ? <StyledTextLoader>
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                              <CustomSkeleton heights={["calc(50px*1.5)"]} widths={['100%']}  radius={"sm"} />
                                          </StyledTextLoader>
                                          :
                                          personImages?.cast?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).map((item,index) => {
                                          return(
                                              <Card shadow="sm" padding="lg" radius="md" withBorder>
                                              <Flex
                                              direction={"column"}
                                              >
                                                <Flex
                                                >
                                                    <Text>{item.release_date ? item.release_date : "-"}</Text>
                                                    <List
                                                        withPadding
                                                        spacing="xs"
                                                        size="sm"
                                                        center
                                                        icon={
                                                            <IconPoint stroke={2} />
                                                        }

                                                    >
                                                        <List.Item> {item.original_title}</List.Item>
                                                    </List>
                                                </Flex>
                                              </Flex>
                                            </Card>
                                          )
                                      })
                                  }
                              </Flex>
                           </Flex>
                       </Flex>
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
export default Person