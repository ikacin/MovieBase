
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle} from '@tabler/icons-react';
import styled from 'styled-components';
const CustomTabs = ({type,text,content,MediaHub,VisualComm,defaultValue,caption,NowPlaying,display,firstCount,secondCount,maxHeight}) =>  {

    const handleTabChange = async (value) => {
        if (value === 'messages') {
            await NowPlaying();
        }
    };


    return (
        <StyledTabsMenu>
            <Tabs maxHeight={maxHeight} defaultValue={defaultValue}  onTabChange={(value) => handleTabChange(value)}>
                <Tabs.List>
                    <div id={"caption-text"}>{caption}</div>
                    <Tabs.Tab  value="gallery" icon={<IconPhoto size="0.8rem" />}>{MediaHub} {firstCount}</Tabs.Tab>
                    <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>{VisualComm} {secondCount}</Tabs.Tab>
                </Tabs.List>

                {
                    type &&
                    <>
                        <Tabs.Panel className={"tabs-panel"} value="gallery" pt="xs">
                         <TabsStyle display={display}>
                             {text}
                         </TabsStyle>
                        </Tabs.Panel>

                        <Tabs.Panel  className={"tabs-panel"} value="messages" pt="xs">
                           <TabsStyle display={display}>
                               {content}
                           </TabsStyle>
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
    max-width: 1288px;
    overflow-y: hidden;
    overflow-x: scroll;
    max-height: ${({maxHeight}) => maxHeight ? maxHeight : "360px"};
  }

  .mantine-Tabs-tabsList {
    border: none;
    padding-left: 40px;
    gap: 10px;
    align-items: center;
  }


  .tabs-panel::-webkit-scrollbar {
    background-color: #ffffff; 
    height: 8px;
    cursor: pointer;
  }

  .tabs-panel::-webkit-scrollbar-thumb {
    background-color: #dbdbdb;

  }

  .tabs-panel::-webkit-scrollbar-thumb:hover {
    background-color: #c5c3c3; 
  }
`

const TabsStyle = styled.div`
  display: ${({display}) => display};
`

export default CustomTabs