import { Divider } from '@mantine/core';

const Dividers = ({color,orientation,size}) => {
    return (
        <>
            <Divider
                color={color}
                orientation={orientation}
                size={size}
            />
        </>
    );
}

export default Dividers