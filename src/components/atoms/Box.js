import { Text, Paper } from '@mantine/core';
import { List, ThemeIcon } from '@mantine/core';
import { IconCircleCheck, IconCheck } from '@tabler/icons-react';

import styled from 'styled-components';
const CustomPaper = ({title,type,shadow,color,background,padding,fontSize,borderRadius,textFirst,textSecond,textThird,textFourth,textFifth,textSixth,textSeventh}) => {
    return (
        <Papers shadow={shadow ?? "sm"} radius="xs" w={"300px"} >
            <TextTitle
                color={color}
                background={background}
                padding={padding}
                fontSize={fontSize}
                borderRadius={borderRadius}
                >
                {title}
            </TextTitle>
            {
                type &&
                <List
                    pt={"10px"}
                    pl={"20px"}
                    spacing="sm"
                    size="lg"
                    center
                    icon={
                        <ThemeIcons  size={24} radius="xl">
                            <IconCheck size="1rem" />
                        </ThemeIcons>
                    }

                >
                    <List.Item>{textFirst}</List.Item>
                    <List.Item>{textSecond}</List.Item>
                    <List.Item>{textThird}</List.Item>
                    <List.Item>{textFourth}</List.Item>
                    <List.Item>{textFifth}</List.Item>
                    <List.Item>{textSixth}</List.Item>
                    <List.Item>{textSeventh}</List.Item>
                </List>
            }
        </Papers>
    );
}

const Papers = styled(Paper)`
    

`


const TextTitle = styled(Text)`
  color: ${({color}) => color};
  background: ${({background}) => background};
  padding: ${({padding}) => padding};
  font-size: ${({fontSize}) => fontSize};
  border-radius: ${({borderRadius}) => borderRadius};
`

const ThemeIcons = styled(ThemeIcon)`
  background: none;
  color: #432c2c;
`


export default CustomPaper