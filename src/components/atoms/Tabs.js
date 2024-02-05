import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle} from '@tabler/icons-react';
import styled from 'styled-components';
const CustomTabs = ({type,text,content,MediaHub,VisualComm,defaultValue,caption,NowPlaying}) =>  {

    const handleTabChange = async (value) => {
        if (value === 'messages') {
            await NowPlaying();
        }
    };


    return (
        <StyledTabsMenu>
            <Tabs defaultValue={defaultValue}  onTabChange={(value) => handleTabChange(value)}>
                <Tabs.List>
                    <div id={"caption-text"}>{caption}</div>
                    <Tabs.Tab  value="gallery" icon={<IconPhoto size="0.8rem" />}>{MediaHub}</Tabs.Tab>
                    <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>{VisualComm}</Tabs.Tab>
                </Tabs.List>

                {
                    type &&
                    <>
                        <Tabs.Panel className={"tabs-panel"} value="gallery" pt="xs">
                         <div style={{display:"flex",gap:"15px"}}>
                             {text}
                         </div>
                        </Tabs.Panel>

                        <Tabs.Panel  className={"tabs-panel"} value="messages" pt="xs">
                           <div style={{display:"flex",gap:"15px"}}>
                               {content}
                           </div>
                        </Tabs.Panel>
                    </>
                }
            </Tabs>
        </StyledTabsMenu>
    );
}

const StyledTabsMenu = styled.div`
  .tabs-panel {
    gap: 40px;
    max-width: 1230px;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .mantine-Tabs-tabsList {
    border: none;
  }

  /* Yatay kaydırma çubuğu rengi */

  .tabs-panel::-webkit-scrollbar {
    background-color: #ffffff; /* Arka plan rengi */
    height: 8px; /* Yatay kaydırma çubuğu yüksekliği */
    cursor: pointer;
  }

  /* Kaydırma çubuğu */

  .tabs-panel::-webkit-scrollbar-thumb {
    background-color: #dbdbdb; /* Kaydırma çubuğu rengi */

  }

  /* Kaydırma çubuğu hover durumu */

  .tabs-panel::-webkit-scrollbar-thumb:hover {
    background-color: #c5c3c3; /* Kaydırma çubuğu hover rengi */
  }


`

export default CustomTabs