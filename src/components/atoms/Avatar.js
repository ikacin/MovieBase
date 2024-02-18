import { Avatar } from '@mantine/core';
import styled from 'styled-components';
const AvatarItems = ({type,content,size,color,background,Icon,src}) => {
    return (
        <>
            {
                type === 1 &&
                <Avatars src={src} alt="it's me" />
            }

            {
                type === 2 &&
                <Avatars radius="xl" />
            }

            {
                type === 3 &&
                <Avatars color={color ?? ""} background={background ?? "red"} radius="xl" size={size ?? "30px"} >{content}</Avatars>
            }

            {
                type === 4 &&
                <Avatars color={color ?? "blue"}  radius="xl" size={size ?? "md"}  background={background ?? "#fff"}>
                    {Icon}
                </Avatars>
            }

        </>
    );
}


const Avatars = styled(Avatar)`
  
  .mantine-Avatar-placeholder{
    background: ${({background}) => background};
    color: ${(props) => props.color ?? "#fff"};
  }


`



export default AvatarItems