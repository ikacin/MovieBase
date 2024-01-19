import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
const CustomButton = ({disabled,loading,children,radius,color,variant}) => {
    return (
        <Button
            variant={variant ?? "filled"}
            leftIcon={<IconDatabase size="1rem" />}
            loading={loading}
            loaderPosition="center"
            disabled={disabled}
            radius={radius}
            color={color}
        >
            {children}
        </Button>
    );
}

export default CustomButton