import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
const CustomButton = ({disabled,loading,children,radius,color,variant,leftIcon,onClick,type}) => {
    return (
        <Button
            variant={variant ?? "filled"}
            leftIcon={leftIcon ?? <IconDatabase size="1rem" />}
            loading={loading}
            loaderPosition="center"
            disabled={disabled}
            radius={radius}
            color={color}
            onClick={onClick}
            type={type}
        >
            {children}
        </Button>
    );
}

export default CustomButton