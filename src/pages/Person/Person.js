import Axios from "axios";
import React,{useEffect,useState} from "react";
import {useParams,useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import SubHeader from "../../components/organisms/Header/SubHeader";
import {Container, Flex,Image,Button} from "@mantine/core";
import CustomDivider from "../../components/atoms/Divider";
import logo from "../../assests/image/no-image-.png";
import {useTranslation} from "react-i18next";
import styled, { keyframes, css } from 'styled-components';
import CustomSkeleton from "../../components/atoms/Skeleton";
import trending from "../../assests/image/trending-bg.svg";
import CustomButton from "../../components/atoms/CustomButton";
import { IconChevronRight } from '@tabler/icons-react';
const Person = () => {
    const[personList,setPersonList] = useState([])
    const[personImages,setpersonImages] = useState([])
    const [loading,setLoading] = useState(false)
    const { personId } = useParams();
    const { t, i18n } = useTranslation();
    const navigate =  useNavigate()
    const lang = useParams()
    const getPerson = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, options);
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits`, options);
            console.log("images",response.data);
            setpersonImages(response.data)

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

    const personBtn = (item) => {
        // const formattedName = item.name.replace(/\s+/g, '-').toLowerCase();
        navigate(`/${lang}/person/${item.id}`);
    }
    const [showFullText, setShowFullText] = useState(false);
    const MAX_LENGTH = 500; // Gösterilecek maksimum karakter sayısı
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
                    mt={"40px"}
                    px={"60px"}
                    size={"xl"}
                    display={"flex"}

                >
                   <Flex
                    justify={"flex-start"}
                    gap={"40px"}
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
                           gap={"15px"}
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
                                                                               <img onClick={() => personBtn(item)} src={item.poster_path ? `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg` : logo} />
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
                       </Flex>
                   </Flex>



                </Container>
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
  font-size: 16px;
  font-family: "Source Sans Pro",Arial,sans-serif;
`



const SliderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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

const StyledCredits = styled.div`
  display: flex;
  gap: 15px;
  max-width: 990px;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: 200px;
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
`
const WrapNames = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledImage = styled.div`
  position: relative;
  display: inline-block; /* Optional: makes the container fit its content */
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
  
  .movie-text{
    padding: 10px 0;
    text-align: center;
    font-family:"Source Sans Pro", Arial, sans-serif ;
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