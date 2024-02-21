import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import styled from 'styled-components';
const CustomModal = ({content,Btn,title,size,height,padding,background,boxshadow,position}) => {
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
            >
                {content}
            </ModalX>

            <Group position={position ?? "center"}>
                <ButtonX onClick={open}>{Btn}</ButtonX>
            </Group>
        </>
    );
}


const ButtonX = styled.div`
  

`

const ModalX = styled(Modal)`
  .mantine-Modal-header{
    padding: 15px;
    background: #000;
    color: #fff;
  }

    .mantine-Modal-content{
      height: ${({height}) => height};
      padding:${({padding}) => padding};
      background: ${({background}) => background};
      box-shadow: ${({boxshadow}) => boxshadow};
    }


`


export default CustomModal