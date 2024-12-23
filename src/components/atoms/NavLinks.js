import { useState } from 'react';
import { Box, NavLink } from '@mantine/core';
import styled from 'styled-components';


const NavLinks = ({data,border,gap,padding,fontSize,fontWeight,active,setActive}) => {

    const items = data.map((item, index) => (
        <NavLink
            href="#required-for-focus"
            key={item.label}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            onClick={() => setActive(index)}
            bg={active === item.media_type ? "gray.3" : ""}
            styles={{
                label:{
                    fontSize:fontSize,
                    fontWeight:fontWeight
                },
            }}
        />
    ));

    return <Box
        sx={(theme) => ({
            border: border,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap:gap,
            padding:padding
        })}
        w={250}
    >
        {items}
    </Box>;
}

const NavLinked = styled(NavLink)`

`

export default NavLinks;