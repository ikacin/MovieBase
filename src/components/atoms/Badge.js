import { Badge, Box, Flex } from '@mantine/core';
import styled from 'styled-components';
const CustomBadge = ({text,w,variant,size,color,radius}) => {
    return (
        <Flex>

            <Box w={w} ml="md">
                <Badge radius={radius ?? "xl"} color={color ?? "default"} size={size ?? "xs"} variant={variant ?? "filled"} fullWidth>
                    <BadgeText>
                        {text}
                    </BadgeText>
                </Badge>
            </Box>
        </Flex>
    );
}


const BadgeText = styled.div`
    display: flex;
   align-items: center;

`


export default CustomBadge