
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle} from '@tabler/icons-react';
import styled from 'styled-components';
const CustomTabs = ({type,text,content,MediaHub,VisualComm,defaultValue,caption,NowPlaying,display,firstCount,secondCount,maxHeight,px,header,populars,videos,rear,placard,popularText,videosText,rearText,placardText}) =>  {

    const handleTabChange = async (value) => {
        if (value === 'messages' ) {
            await NowPlaying();
        }
    };


    return (
        <StyledTabsMenu>
            <Tabs maxHeight={maxHeight} defaultValue={defaultValue}  onTabChange={(value) => handleTabChange(value)}>
                {
                   !header &&
                    <Tabs.List px={px}>
                        <div id={"caption-text"} >{caption}</div>
                        <Tabs.Tab  value="gallery" icon={<IconPhoto size="0.8rem" />}>{MediaHub} {firstCount}</Tabs.Tab>
                        <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>{VisualComm} {secondCount}</Tabs.Tab>
                    </Tabs.List>
                }

                {
                    header &&
                    <Tabs.List px={px}>
                        <div id={"caption-text"} >{caption}</div>
                        <Tabs.Tab value="popular" icon={<IconPhoto size="0.8rem" />}>{populars} {firstCount}</Tabs.Tab>
                        <Tabs.Tab value="videos" icon={<IconMessageCircle size="0.8rem" />}>{videos} {secondCount}</Tabs.Tab>
                        <Tabs.Tab value="rear" icon={<IconMessageCircle size="0.8rem" />}>{rear} {secondCount}</Tabs.Tab>
                        <Tabs.Tab value="placard" icon={<IconMessageCircle size="0.8rem" />}>{placard} {secondCount}</Tabs.Tab>
                    </Tabs.List>
                }


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


                {
                    type === "more" &&
                    <>
                        <Tabs.Panel className={"tabs-panel"} value="popular" pt="xs">
                            <TabsStyle display={display}>
                                {popularText}
                            </TabsStyle>
                        </Tabs.Panel>

                        <Tabs.Panel  className={"tabs-panel"} value="videos" pt="xs">
                            <TabsStyle display={display}>
                                {videosText}
                            </TabsStyle>
                        </Tabs.Panel>


                        <Tabs.Panel  className={"tabs-panel"} value="rear" pt="xs">
                            <TabsStyle display={display}>
                                {rearText}
                            </TabsStyle>
                        </Tabs.Panel>

                        <Tabs.Panel  className={"tabs-panel"} value="placard" pt="xs">
                            <TabsStyle display={display}>
                                {placardText}
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
    .mantine-Tabs-tabLabel{
      font-weight: 600;
      font-size: 1.1em;
    }
  
  .mantine-Tabs-tabsList {
    border: none;
    gap: 10px;
    align-items: center;
    font-weight: 600;
    font-size: 1.1em;
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