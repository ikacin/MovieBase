import { ThemeIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const CustomRingProgress = ({size,count,thickness,value,color,textColor}) => {
    return (
        <>
            <RingProgress
                thickness={thickness}
                size={size}
                sections={[{ value:value, color:color }]}
                label={
                    <Text color={textColor} weight={700} align="center" size="sm">
                        {count}
                    </Text>
                }
            />
        </>
    );
}
export default CustomRingProgress