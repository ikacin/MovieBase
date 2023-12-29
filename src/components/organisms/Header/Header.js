import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Group, Center, Burger, Container,Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '@mantine/core';
import logo from '../../../assests/image/header-logo.svg';
import classes from './HeaderMenu.module.css';
import styled from 'styled-components';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import Avatar from "../../atoms/Avatar";


const Header = ({onClick}) => {
    const { t, i18n } = useTranslation();
    const [opened, { toggle }] = useDisclosure(false);

    const links = [
        { link: '/about', label:  t("films") },
        {
            link: '#1',
            label:t("series"),
            links: [
                { link: '/docs', label:"" },
                { link: '/resources', label: 'Resources' },
                { link: '/community', label: 'Community' },
                { link: '/blog', label: 'Blog' },
            ],
        },
        { link: '/about', label:  t("persons") },
        { link: '/pricing', label:  t("see_more") },
    ];


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
                        <img src={logo}  alt="Logo" width={"150px"} height={"150px"}/>
                        <Group gap={5} >
                            {items}
                        </Group>
                        <RightList className={"tasd"}>
                            <Menu shadow="md" width={200}>
                                <Menu.Item icon={<IconSettings size={22} />}></Menu.Item>
                                <Menu.Item icon={<IconMessageCircle size={22} />}
                                           onClick={onClick}
                                ></Menu.Item>
                                <Menu.Item icon={<Avatar type={3}  content={"İ"}/>}></Menu.Item>
                                <Menu.Item
                                    icon={<IconSearch size={22} />}
                                    rightSection={<Text size="xs" color="dimmed"></Text>}

                                >
                                </Menu.Item>
                            </Menu>
                        </RightList>
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
    font-size: 16px;
    width: 100%;
  }
  
  .HeaderMenu_inner__wIqxf{
    width: 100%;
  }
  
  .mantine-Group-root{
    text-transform:capitalize;
    gap: 40px;
    padding-left: 30px;
  }

`
const HeaderText = styled.div`
  .mantine-Menu-item{
    background: transparent;
    color: #ffffff;
  }
  
`

const RightList = styled.div`
  display: flex;
  margin-left: auto;
`


export default Header
