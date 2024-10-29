import { useState } from 'react';
import { Menu} from '@mantine/core';
import { useContext } from 'react';
import { IconHeartFilled,IconList,IconStarFilled ,IconBookmarkFilled,IconHeart } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import {MyContext} from "../../store/Store";
const CustomMenu = ({Context,onClick,itemId, setSelectedItemId,addFavorite}) => {

    const { state, dispatch } = useContext(MyContext);
    const [opened, setOpened] = useState(false);
    const ref = useClickOutside(() => setOpened(false));
    const handleMenuClick = () => {
        if (onClick) {
            onClick();
            setSelectedItemId(itemId);
            setOpened(true)
        }
    };




    return (
        <Menu shadow="md" width={200}>
            <div onClick={handleMenuClick}>
                <Menu.Target>
                    {Context}
                </Menu.Target>
            </div>

            {
                opened && (
                    <Menu.Dropdown ref={ref}>
                        <Menu.Item icon={<IconList size={14} />}>Listeye Ekle</Menu.Item>
                        <Menu.Item
                            color={state?.favoriteItems?.includes(itemId) ? "red" : "black"}
                            onClick={() => addFavorite({ id: itemId })}
                            icon={state?.favoriteItems?.includes(itemId) ? <IconHeartFilled color={"red"}  size={14} /> :  <IconHeart size={14} />}
                        >Favori
                        </Menu.Item>
                        <Menu.Item icon={<IconBookmarkFilled size={14} />}>İzleme Listesi</Menu.Item>
                        <Menu.Item icon={<IconStarFilled size={14} />}>Verdiğin Oy</Menu.Item>
                    </Menu.Dropdown>
                )
            }
        </Menu>
    );
}

export default CustomMenu