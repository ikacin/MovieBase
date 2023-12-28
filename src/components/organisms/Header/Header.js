import React from 'react';
import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { IconChevronDown } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import logo from '../../../assests/image/header-logo.svg';
import classes from './HeaderMenu.module.css';
import styled from 'styled-components';


const links = [
    { link: '/about', label: 'Features' },
    {
        link: '#1',
        label: 'Learn',
        links: [
            { link: '/docs', label: 'Documentation' },
            { link: '/resources', label: 'Resources' },
            { link: '/community', label: 'Community' },
            { link: '/blog', label: 'Blog' },
        ],
    },
    { link: '/about', label: 'About' },
    { link: '/pricing', label: 'Pricing' },
    {
        link: '#2',
        label: 'Support',
        links: [
            { link: '/faq', label: 'FAQ' },
            { link: '/demo', label: 'Book a demo' },
            { link: '/forums', label: 'Forums' },
        ],
    },
];

const Header = () => {
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                {/*<IconChevronDown size="0.9rem" stroke={1.5} />*/}
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </a>
        );
    });

    return (
        <HeaderWrap>
            <header className={classes.header}>
                <Container size="md">
                    <HeaderText className={classes.inner}>
                        {/*<MantineLogo size={28} />*/}
                        <img src={logo}  alt="Logo" width={"200px"} height={"200px"}/>
                        <Group gap={5} visibleFrom="sm">
                            {items}
                        </Group>
                        {/*<Burgered opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />*/}
                    </HeaderText>
                </Container>
            </header>
        </HeaderWrap>
    );
}

const HeaderWrap = styled.div`
  .mantine-Container-root{
    display: flex;
    align-items: center;
    height: 100%;
    color: #ffff;
    font-size: 14px;
  }

`
const HeaderText = styled.div`

  
`




export default Header
