import React,{useState,useEffect } from 'react';
import styled from 'styled-components';
import mainBanner from'../../assests/image/banner.webp';
import subBanner from'../../assests/image/sub-banner.webp';
import trending from'../../assests/image/trending-bg.svg';
import {Container, Title} from '@mantine/core';
import { Input } from '@mantine/core';
import CustomButton from "../../components/atoms/CustomButton";
import { IconSearch,IconArrowRight} from '@tabler/icons-react';
import CustomTabs from "../../components/atoms/Tabs";
import Axios from 'axios';
const HomePage = () => {

    const [list,setList] = useState([])

    const gotoPage = () => {
        window.location.href = "/2023";
    }




    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
                }
            };

            try {
                const response = await Axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
                console.log(response.data);
                setList(response.data.results)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);





    return(
            <Container size={"xl"}>

                    <Section>
                        <BannerContainer>
                                <ContentWrapper className="content_wrapper wrap">
                                    <TitleBanner>
                                        <div>Hoş Geldiniz.</div>
                                        <div>Milyonlarca film, TV şovu ve keşfedilecek kişi. Şimdi keşfedin.</div>
                                    </TitleBanner>

                                    <SearchWrap className="search">
                                        <div>
                                            <Input
                                                size="md"
                                                radius="lg"
                                                placeholder="Film, dizi, kişi ara..."
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
                                               <div >The best (and worst) of the year from TMDB.</div>

                                               <CustomButton
                                                children={"Check it out"}
                                                radius="lg"
                                                variant="outline"
                                                leftIcon={<IconArrowRight size="1rem" />}
                                                 onClick={() => gotoPage()}
                                               />
                                           </SubText>
                                       </StyledText>
                               </ContentWrapper>
                    </SubBannerContainer>

                        <ContentWrapper>
                            <StyledTrend>
                                <div>
                                    <div>Trend</div>
                                    <CustomTabs
                                        VisualComm={"Bugün"}
                                        MediaHub={"Bu Hafta"}
                                        text={
                                         list.map((item,index) => {
                                             return(
                                                 <div >
                                                     <TrendingContainer>
                                                         <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                         <div key={index}>{item.title}</div>
                                                     </TrendingContainer>

                                                 </div>
                                             )

                                         })

                                        }
                                        content={"TESTSSSSSSSSSSSSSSSSSSSSSSSSSs"}
                                        type={"list"}
                                        defaultValue={"gallery"}
                                    />

                                </div>


                            </StyledTrend>
                        </ContentWrapper>

                    </Section>


            </Container>
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
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 290px;
  background-repeat: no-repeat;
  display: flex;
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


  
 & div:nth-child(1){
   gap: 30px;
   font-size: 1.2em;
   color: #000000;
 }
`




export default HomePage