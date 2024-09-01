import { Button } from '@mantine/core';
import styled from 'styled-components';
import { IconDatabase } from '@tabler/icons-react';
const CustomButton = ({disabled,loading,children,radius,color,variant,leftIcon,onClick,type,size,bordercolor,fontsize,background,padding}) => {
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

  &:active {
    transform: scale(1);
  }
`;

export default CustomButton