import { useState } from 'react';
import { Box, NavLink } from '@mantine/core';
import styled from 'styled-components';


const NavLinks = ({data,border,gap,padding,fontSize,fontWeight}) => {
    const [active, setActive] = useState(0);

    const items = data.map((item, index) => (
        <NavLink
            href="#required-for-focus"
            key={item.label}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => setActive(index)}
            bg={active === index ? "gray.3" : ""}
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