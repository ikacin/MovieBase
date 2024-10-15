import {  RingProgress, Text} from '@mantine/core';


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