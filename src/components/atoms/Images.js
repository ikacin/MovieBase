import { Image } from '@mantine/core';

const Images = ({max,radius,mx,src,width,height}) => {
    return (
        <Image
            maw={max}
            mx={mx ?? "auto"}
            radius={radius ?? "md"}
            src={src ?? "./avatar.png"}
            width={width}
            height={height}
            fit="contain"

        />
    );
}

export default Images