import { Loader } from '@mantine/core';

const CustomLoader = ({variant,size}) => {
    return <Loader variant={variant ?? "bars"}  size={size ?? "lg"} />;
}

export default CustomLoader