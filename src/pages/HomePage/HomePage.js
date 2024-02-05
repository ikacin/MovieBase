import React,{useState,useEffect } from 'react';
import styled from 'styled-components';
import mainBanner from'../../assests/image/banner.webp';
import subBanner from'../../assests/image/sub-banner.webp';
import trending from'../../assests/image/trending-bg.svg';
import {Container} from '@mantine/core';
import { Input } from '@mantine/core';
import CustomButton from "../../components/atoms/CustomButton";
import { IconSearch,IconArrowRight} from '@tabler/icons-react';
import CustomTabs from "../../components/atoms/Tabs";
import Axios from 'axios';
import RingProgress from "../../components/atoms/RingProgress";
const HomePage = () => {

    const [list,setList] = useState([])
    const [nowList,setNowList] = useState([])
    const gotoPage = () => {
        window.location.href = "/2023";
    }


        const TopRated = async () => {
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

    const NowPlaying = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };

        try {
            const response = await Axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
            console.log(response.data);
            setNowList(response.data.results)
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        TopRated()

    }, []);

    const roundToInteger = (number) => {
        return Math.round(number);
    }

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
                                <div className={"wrap-list"}>
                                    <CustomTabs
                                        NowPlaying={NowPlaying}
                                        caption={"Trend"}
                                        VisualComm={"Bugün"}
                                        MediaHub={"Bu Hafta"}
                                        text={
                                         list.map((item,index) => {
                                             return(
                                                 <div>
                                                     <TrendingContainer>
                                                        <CardStyle className={"sd"}>
                                                            <img  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                            <ProgressWrap>
                                                                <RingProgress size={40} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"6px", color: '#ffffff' }}>%</span></span>
                                                                } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                            </ProgressWrap>
                                                            <div className={"movie-text"}>
                                                                <div key={index}>{item.title}</div>
                                                                <div>{item.release_date}</div>
                                                            </div>
                                                        </CardStyle>

                                                     </TrendingContainer>

                                                 </div>
                                             )

                                         })
                                        }
                                        content={
                                            nowList.map((item,index) => {
                                                return(
                                                    <div>
                                                        <TrendingContainer>
                                                            <CardStyle className={"sd"}>
                                                                <img  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}.jpg`}/>
                                                                <ProgressWrap>
                                                                    <RingProgress size={40} count={<span style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{`${roundToInteger(item.popularity)}`}<span style={{ fontSize:"6px", color: '#ffffff' }}>%</span></span>
                                                                    } thickness={4} value={item.popularity} color={item.popularity > 70 ? "#c1c42d" : "green"} textColor={item.popularity > 70 ? "#c1c42d" : "green"}/>
                                                                </ProgressWrap>
                                                                <div className={"movie-text"}>
                                                                    <div key={index}>{item.title}</div>
                                                                    <div>{item.release_date}</div>
                                                                </div>
                                                            </CardStyle>

                                                        </TrendingContainer>

                                                    </div>
                                                )

                                            })
                                        }
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
  background-position: center;
  width: 100%;
  height: 338px;
  background-repeat: no-repeat;
  display: flex;
  background-position-y: 90px;

  
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
  color: #ffffff;
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
const CardStyle = styled.div`
  width: 150px;
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  width: 100%;
  min-height: calc(150px*1.5);
  height: calc(150px*1.5);
  
  .movie-text{
    padding-top: 30px;
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
  }
;
`

const ProgressWrap = styled.div`
    position: relative;
  
    .mantine-RingProgress-root{
      position: absolute;
      top: -30px;
      left: -1px;
      
    }

`



export default HomePage