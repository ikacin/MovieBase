import { useState } from 'react';
import { Menu} from '@mantine/core';
import { IconHeartFilled,IconList,IconStarFilled ,IconBookmarkFilled   } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
const CustomMenu = ({Context,onClick,itemId, setSelectedItemId}) => {

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
                        <Menu.Item icon={<IconHeartFilled size={14} />}>Favori</Menu.Item>
                        <Menu.Item icon={<IconBookmarkFilled size={14} />}>İzleme Listesi</Menu.Item>
                        <Menu.Item icon={<IconStarFilled size={14} />}>Verdiğin Oy</Menu.Item>
                    </Menu.Dropdown>
                )
            }
        </Menu>
    );
}

export default CustomMenu