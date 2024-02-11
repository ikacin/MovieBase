import React,{useState,useEffect } from 'react';
import LangButton from "../../components/atoms/LangButton";
import SubHeader from "../../components/organisms/Header/SubHeader";
import {Container} from '@mantine/core';
import styled, { keyframes } from 'styled-components';
import Axios from 'axios';
import {useNavigate,useParams } from "react-router-dom";
import CustomProgress from "../../components/atoms/Progress";
import CustomRingProgress from "../../components/atoms/RingProgress";
const Details = () => {
    const [list,setList] = useState([])
    const[movieDetails,setMovieDetails] = useState([]);
    const[loading,setLoading] = useState(true)
    const { movieId } = useParams();

    const MovieDetails = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTlhYjhkNTI2Zjg5YjFjZTQ0OWY4MWExYTYwNWVhMCIsInN1YiI6IjY1OGMxYjkxMjcxNjcxNzFkNmE0ZmE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9nvU3wDIXAZ-f-QsOXAudhNNoNGaACW6RVy_O3fuis'
            }
        };

        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
            console.log(response.data);
            setMovieDetails(response.data)
            setList(response.data)
        } catch (error) {
            console.error(error);
        }  finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        MovieDetails()
    },[])
    const posterPath = movieDetails.poster_path;
    return(
        <div>
            <LangButton/>
            <SubHeader/>
            <Container pt={"80px"} fluid={true} px={0}>

                <InnerContentCustomBg>
                    <HeaderLargeFirst  posterPath={posterPath}>
                        <Flex>
                            <StyledPoster>
                                <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.poster_path}.jpg`}/>
                            </StyledPoster>
                            <StyledList>
                                <Title>{list.original_title}</Title>
                               <InfoItem>
                                   <div>{list.release_date}</div>
                                   <div>{list.runtime}</div>
                               </InfoItem>
                                <ContentList>
                                    <CustomRingProgress
                                        value={list.vote_average}
                                        count={list.vote_average}
                                        color={"green"}
                                        size={90}
                                        thickness={10}
                                    />
                                    <div>Üye Puanları</div>
                                </ContentList>
                            </StyledList>
                        </Flex>
                    </HeaderLargeFirst>
                </InnerContentCustomBg>


            </Container>
        </div>
    )

}


const StyledOrginal = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  border-bottom: 1px solid rgba(var(--lightGrey),1);
  border-style: none;
  background-image: linear-gradient(to right, rgba(52.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 10.5, 10.5, 0.84) 50%, rgba(52.5, 10.5, 10.5, 0.84) 100%);
  border-bottom: 1px solid var(--primaryColor);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/pRmF6VBsRnvWCbLB9P80UvZFMyK.jpg');
  
`

const HeaderLargeFirst = styled.div`
    border-bottom: 1px solid var(--primaryColor);
    background-position: left calc((50vw - 170px) - 340px) top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${({ posterPath }) => `url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${posterPath}')`};
    min-height: 600px;
    display: flex;
    align-items: center;
    
`;

const InnerContentCustomBg = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, rgba(52.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 10.5, 10.5, 0.84) 50%, rgba(52.5, 10.5, 10.5, 0.84) 100%);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  
`;

const StyledPoster = styled.div`
  border-width: 0;
  width: 365px;
  height: 534px;
  overflow: hidden;
  border-radius: 13px;
  margin-left: 150px;
    & img{
      display: block;
      width: 100%;
      min-width: 100%;
      height: 100%;
      min-height: 100%;
      border-width: 0;
      outline: 0;
      object-fit: cover;
    }
  
`

const StyledList = styled.div`
  color: #ffffff;
  padding: 100px 0;
`
const Flex = styled.div`
  display: flex;
  gap: 50px;
`
const Title = styled.div`
  font-size: 35.2px;
`
const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    &  div:first-child{
      gap: 8px;
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
  & div:first-child::before {
    content: "";
    display: inline-block;
    background: #ffffff;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
    
  &  div:nth-child(2){
    gap:8px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  & div:nth-child(2)::before {
    content: "";
    display: inline-block;
    background: #ffffff;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`

const ContentList = styled.div`
    display: flex;
    align-items: center;
    
    & > div:nth-child(2){
      width: 70px;
      white-space: pre-line;
    }
  
`

export default Details