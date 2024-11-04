import { useDisclosure } from '@mantine/hooks';
import { Modal, Group} from '@mantine/core';
import styled from 'styled-components';
import CustomButton from "./CustomButton";
import {useState} from "react";
const CustomModal = ({content,btn,title,size,height,padding,background,boxshadow,position,className,centered,disabled,btnBackground,leftIcon,heightX,bordercolor,headerDisplay,setOpenedX}) => {
    const [opened, { open, close }] = useDisclosure(false);


    const handleClose = () => {
        console.log("handleClose called")
        setOpenedX(false);
        close();
    }

    return (
        <>
            <ModalX
                opened={opened}
                onClose={handleClose}
                title={title}
                size={size ?? "md"}
                height={height}
                padding={padding}
                background={background}
                boxShadow={boxshadow}
                centered={centered}
                headerDisplay={headerDisplay}
            >
                {content}
            </ModalX>

            <Group position={position ?? "center"}  className={className}>
                <CustomButton
                    background={btnBackground ?? "transparent"}
                    leftIcon={leftIcon ?? ""}
                    disabled={disabled}
                    onClick={open}
                    children={btn}
                    height={heightX ?? "300px"}
                    bordercolor={bordercolor ?? "transparent"}
                />
            </Group>
        </>
    );
}


const ModalX = styled(Modal)`
  .mantine-Modal-header{
    padding: 15px;
    background-color: ${({background}) => background ?  background :  "#000"};
    color: #fff;
    display: ${({headerDisplay}) => headerDisplay ? headerDisplay : "block"};
  }

    .mantine-Modal-content{
      height: ${({height}) => height};
      padding:${({padding}) => padding};
      background: ${({background}) => background};
      box-shadow: ${({boxshadow}) => boxshadow};
    }


`


export default CustomModal