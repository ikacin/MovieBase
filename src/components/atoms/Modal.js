import { useDisclosure } from '@mantine/hooks';
import { Modal, Group,Button} from '@mantine/core';
import styled from 'styled-components';
import CustomButton from "./CustomButton";
const CustomModal = ({content,Btn,title,size,height,padding,background,boxshadow,position,className,display,centered,disabled,BtnBackground,leftIcon,heightX,bordercolor}) => {
    const [opened, { open, close }] = useDisclosure(false);



    return (
        <>
            <ModalX opened={opened}
                   onClose={close}
                   title={title}
                   size={size ?? "md"}
                   height={height}
                   padding={padding}
                   background={background}
                   boxShadow={boxshadow}
                   display={display}
                   centered={centered}
            >
                {content}
            </ModalX>

            <Group position={position ?? "center"}  className={className}>
                <CustomButton
                    background={BtnBackground ?? "transparent"}
                    leftIcon={leftIcon ?? ""}
                    disabled={disabled}
                    onClick={open}
                    children={Btn}
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
    display: ${({display}) => display};
  }

    .mantine-Modal-content{
      height: ${({height}) => height};
      padding:${({padding}) => padding};
      background: ${({background}) => background};
      box-shadow: ${({boxshadow}) => boxshadow};
    }


`


export default CustomModal