import { Tooltip} from '@mantine/core';

const CustomToolTip = ({label,text,position,offset,color}) => {
    return (
        <Tooltip
            withArrow
            offset={offset ?? 8}
            label={label}
            position={position ?? "top"}
            color={color ?? "#032541"}

        >
           <div>{text}</div>
        </Tooltip>
    );
}

export default CustomToolTip