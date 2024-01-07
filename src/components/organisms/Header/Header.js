import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Group, Center, Burger, Container,Button,Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '@mantine/core';
import logo from '../../../assests/image/header-logo.svg';
import classes from './HeaderMenu.module.css';
import styled from 'styled-components';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import Avatar from "../../atoms/Avatar";


const Header = ({onClick,onchange}) => {
    const { t, i18n } = useTranslation();
    const [opened, { toggle }] = useDisclosure(false);

    const links = [
        { link: '/about', label:  t("films") },
        {
            link: '#1',
            label:t("series"),
            links: [
                { link: '/docs', label:"Resources" },
                { link: '/resources', label: 'Resources' },
                { link: '/community', label: 'Community' },
                { link: '/blog', label: 'Blog' },
            ],
        },
        { link: '/about', label:  t("persons") },
        { link: '/pricing', label:  t("see_more") },
    ];


    const getLangInfo = (langCode) => {
        switch (langCode) {
            case "/tr":
                return { turkish: "Türkçe", english: "İngilizce" };
            default:
                return { turkish: "İngilizce", english: "Türkçe" };
        }
    }

    const GetLang = (language) => {
        const langCode = window.location.pathname;
        const langInfo = getLangInfo(langCode);

        return language === 'turkish' ? langInfo.turkish : langInfo.english;
    }

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
                <Container size="xl">
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
                                <Menu shadow="md" width={300}>
                                    <Menu.Target>
                                        <CustomLang>TR</CustomLang>
                                    </Menu.Target>

                                    <MenuWrap>
                                        <Menu.Label>{t("language_settings")}</Menu.Label>
                                        <Select
                                            label={t("default_language")}
                                            placeholder={GetLang('turkish')}
                                            data={[
                                                { value: 'türkçe', label: 'Türkçe' },
                                                { value: 'ingilizce', label: 'İngilizce' },
                                            ]}
                                            onChange={onchange}
                                        />

                                        <Select
                                           label={t("return_language")}
                                           placeholder={GetLang('english')}
                                           data={[
                                               { value: 'türkçe', label: 'Türkçe' },
                                               { value: 'ingilizce', label: 'İngilizce' },
                                           ]}
                                           onChange={onchange}
                                        />

                                        <Menu.Divider />
                                    </MenuWrap>
                                </Menu>

                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ProfilButton leftIcon={<Avatar type={3} color={"#fff"}  content={"İ"}/>}>
                                        </ProfilButton>
                                    </Menu.Target>

                                    <Menu.Dropdown>

                                        <Menu.Item icon={<IconSettings size={14} />}>İKACİN
                                            <div>Profili görüntüle</div>
                                        </Menu.Item>

                                        <Menu.Label>Bilgiler</Menu.Label>

                                        <Menu.Item icon={<IconMessageCircle size={14} />}>Tartışmalar</Menu.Item>
                                        <Menu.Item icon={<IconPhoto size={14} />}>Listeler</Menu.Item>
                                        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>İzleme Listesi</Menu.Item>

                                        <Menu.Label>Puanlar</Menu.Label>


                                        <Menu.Item color="red" icon={<IconTrash size={14} />}>Ayarlar</Menu.Item>
                                        <Menu.Item color="red" icon={<IconTrash size={14} />}>Çıkış</Menu.Item>

                                    </Menu.Dropdown>
                                </Menu>
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
    //color: #ffffff;
  }

  .mantine-Menu-divider{
    border: none;
  }
  
`

const RightList = styled.div`
  display: flex;
  margin-left: auto;
`
const MenuWrap = styled(Menu.Dropdown)`
  padding: 10px 20px;
  
  .mantine-InputWrapper-root{
    border: none;
    padding-top: 10px;
 
  }
  .mantine-Input-input{
    background: #e4e7eb;
  }
  .mantine-Text-root{
    font-size: 20px;
    padding: 0;
    font-weight: bold;
    color: #212529;
  }
  
`


const CustomLang = styled(Button)`
  background: transparent;
  border: 1px solid #fff;
  margin: 10px;
  padding: 5px;
  height: 30px;
  &:hover{
    background: #fff!important;
    color:#032541;
  }
`

const ProfilButton = styled(Button)`
  background: transparent;
  height: auto;
  &:hover{
    background: transparent!important;
    
  }
  

`

export default Header
