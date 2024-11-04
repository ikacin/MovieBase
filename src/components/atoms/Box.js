import { Text, Paper } from '@mantine/core';
import { List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import styled from 'styled-components';
import Avatar from "./Avatar";
const CustomPaper = ({title,type,shadow,color,background,padding,fontSize,borderradius,textFirst,textSecond,textThird,textFourth,textFifth,textSixth,textSeventh,src}) => {
    return (
        <Papers shadow={shadow ?? ""} radius="xs" w={"300px"} >
            <TextTitle
                color={color}
                background={background}
                padding={padding}
                fontSize={fontSize}
                borderradius={borderradius}
                >
                {title}
            </TextTitle>
            {
                type === "list" &&
                <List
                    pt={"10px"}
                    pl={"20px"}
                    spacing="sm"
                    size="md"
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

            {
                type === "avatar"&&
                <List
                    pt={"10px"}
                    pl={"20px"}
                    spacing="sm"
                    size="md"
                    center
                    icon={
                        <ThemeIcons  size={24} radius="xl">
                            <Avatar type={1} color={"#fff"} src={src}/>
                        </ThemeIcons>
                    }

                >
                    <List.Item>{textFirst}</List.Item>
                    <List.Item>{textSecond}</List.Item>
                    <List.Item>{textThird}</List.Item>
                    <List.Item>{textFourth}</List.Item>

                </List>
            }
        </Papers>
    );
}

const Papers = styled(Paper)`
      width:initial;
`


const TextTitle = styled(Text)`
  color: ${({color}) => color};
  background: ${({background}) => background};
  padding: ${({padding}) => padding};
  font-size: ${({fontSize}) => fontSize};
  border-radius: ${({ borderradius }) => borderradius};
`

const ThemeIcons = styled(ThemeIcon)`
  background: none;
  color: #432c2c;
`


export default CustomPaper