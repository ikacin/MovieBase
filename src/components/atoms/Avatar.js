import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import styled from 'styled-components';
const AvatarItems = ({type,content,size,color,BackgroundColor}) => {
    return (
        <>
            {
                type === 1 &&
                <Avatar src="avatar.png" alt="it's me" />
            }

            {
                type === 2 &&
                <Avatar radius="xl" />
            }

            {
                type === 3 &&
                <Avatars color={color ?? ""} BackgroundColor={BackgroundColor ?? "red"} radius="xl" size={size ?? "30px"} >{content}</Avatars>
            }

            {
                type === 4 &&
                <Avatar color="blue" radius="sm">
                    <IconStar size="1.5rem" />
                </Avatar>
            }

        </>
    );
}


const Avatars = styled(Avatar)`
  
  .mantine-Avatar-placeholder{
    background:${(props) => props.BackgroundColor};
    color: ${(props) => props.color ?? "#fff"};
  }


`



export default AvatarItems