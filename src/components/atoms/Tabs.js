import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import styled from 'styled-components';
const CustomTabs = ({type,text,content,MediaHub,VisualComm,defaultValue}) =>  {
    return (
        <StyledTabsMenu>
            <Tabs defaultValue={defaultValue}>
                <Tabs.List>
                    <Tabs.Tab  value="gallery" icon={<IconPhoto size="0.8rem" />}>{MediaHub}</Tabs.Tab>
                    <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>{VisualComm}</Tabs.Tab>
                </Tabs.List>

                {
                    type &&
                    <>
                        <Tabs.Panel className={"tabs-panel"} value="gallery" pt="xs">
                         <div style={{display:"flex"}}>
                             {text}
                         </div>
                        </Tabs.Panel>

                        <Tabs.Panel  className={"tabs-panel"} value="messages" pt="xs">
                           <div style={{display:"flex"}}>
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
  .tabs-panel{
    gap: 40px;
    max-width: 1230px;
    overflow-y: hidden;
    overflow-x: scroll;
  }

`

export default CustomTabs