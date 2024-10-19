import React, {useState} from 'react';
import {TextInput, ActionIcon} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


const SearchInput = ({value,setValue,onKeyDown,label,placeholder,size,radius}) => {


    return (
        <>
            <TextInput
                size={size}
                radius={radius}
                leftSectionPointerEvents="none"
                leftSection={
                    <ActionIcon variant="transparent" >
                        <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                }

                label={label}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
            />

        </>
    )


}
export default SearchInput;