import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

const AvatarItems = ({type,content,size,color}) => {
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
                <Avatar color={color ?? "red"} radius="xl" size={size ?? "25px"} >{content}</Avatar>
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

export default AvatarItems