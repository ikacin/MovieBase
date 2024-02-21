import { Badge, Box, Flex } from '@mantine/core';
import styled from 'styled-components';
const CustomBadge = ({text,w,variant,size,color,radius,background,colors,padding}) => {
    return (
        <Flex>
            <Box w={w} >
                <BadgedX padding={padding} background={background} radius={radius ?? "xl"} colors={colors} color={color ?? "default"} size={size ?? "xs"} variant={variant ?? "filled"} fullWidth>
                    <BadgeText>
                        {text}
                    </BadgeText>
                </BadgedX>
            </Box>
        </Flex>
    );
}


const BadgeText = styled.div`
    display: flex;
   align-items: center;
`
const BadgedX = styled(Badge)`
  background: ${({background}) => background};
  color: ${({colors}) => colors};
  padding: ${({padding}) => padding};
`


export default CustomBadge