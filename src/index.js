import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
            <MantineProvider withNormalizeCSS withGlobalStyles>
                    <MantineProvider withNormalizeCSS withGlobalStyles
                                     theme={{colorScheme: 'dark' ? 'light' : "dark "}}>
                            <Notifications position="top-left" zIndex={999999}/>
                            <App/>
                    </MantineProvider>
            </MantineProvider>
    </React.StrictMode>
);


