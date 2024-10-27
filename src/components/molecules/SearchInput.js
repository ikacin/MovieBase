import {TextInput, ActionIcon} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


const SearchInput = ({value,setValue,onKeyDown,label,placeholder,size,radius,variant,leftIcon}) => {


    return (
        <>
            <TextInput
                size={size}
                radius={radius}
                leftSectionPointerEvents="none"
                icon={leftIcon ??   <ActionIcon  variant="transparent" >
                           <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                  </ActionIcon>
                }
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                variant={variant}
                styles={{icon:{
                    width: '20px',
                }
                }}
            />

        </>
    )


}
export default SearchInput;