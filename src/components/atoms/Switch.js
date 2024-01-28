import { useState } from 'react';
import { Switch } from '@mantine/core';

const CustomSwitch = ({size,onLabel,offLabel})  => {
    const [checked, setChecked] = useState(false);
    return <Switch
        checked={checked}
        size={size ?? "md"}
        onLabel={onLabel}
        offLabel={offLabel}
        onChange={(event) => setChecked(event.currentTarget.checked)} />;

}

export default CustomSwitch