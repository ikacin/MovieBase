import { Button } from '@mantine/core';
import styled from 'styled-components';
import { IconDatabase } from '@tabler/icons-react';
const CustomButton = ({disabled,loading,children,radius,color,variant,leftIcon,onClick,type,size,bordercolor,fontsize,background,padding,height,hoverBackground,hoverColor}) => {
    return (
        <Buttons
            variant={variant ?? "filled"}
            leftIcon={leftIcon ?? <IconDatabase size="1rem" />}
            loading={loading}
            loaderPosition="center"
            disabled={disabled}
            radius={radius}
            color={color}
            onClick={onClick}
            type={type}
            size={size}
            bordercolor={bordercolor}
            fontsize={fontsize}
            background={background}
            padding={padding}
            height={height}
            hoverBackground={hoverBackground}
            hoverColor={hoverColor}
        >
            {children}
        </Buttons>
    );
}

const Buttons = styled(Button)`
  color: ${({ color }) => (color ? color : '#ffffff')};
  background: ${({ background }) => (background )};
  border-color: ${({ bordercolor }) => (bordercolor ? bordercolor : '#ffffff')};
  font-size: ${({ fontsize }) => (fontsize ? fontsize : '14px')};
  padding: ${({ padding }) => padding};
  height: ${({height}) => height};
  &:disabled {
      background-color: transparent;
      color:#ececec2e
  }  
    
  &:active {
    transform: scale(1);
  }
    &:hover {
    background: ${({ hoverBackground }) => (hoverBackground ? hoverBackground : "initial")};
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : 'initial')};     
    }  
    
`;

export default CustomButton