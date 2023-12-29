// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { MyContext, MyProvider } from './store/Store';
import LangButton from './components/atoms/LangButton';
import GlobalStyle from './globalStyles';
import HomePage from '../src/pages/HomePage/HomePage';
import language from './helper/i18n';
import { I18nextProvider } from 'react-i18next';
import Test from "./helper/test";
const App = () => {
    return (
        <>
            <MyProvider>
                <MyContext.Consumer>
                    {({ state }) => (
                        <div className="App">
                            <GlobalStyle />
                            <I18nextProvider i18n={language}>
                                <Router>
                                    <Routes>
                                        <Route path="/:lang" element={<HomePage/> }/>
                                        <Route path="/" element={<Test />} />
                                        {/*<Route exact path="/" element={state.authorization ? <Components /> : <Redirect to="/login" />} />*/}
                                    </Routes>
                                </Router>
                            </I18nextProvider>
                        </div>
                    )}
                </MyContext.Consumer>
            </MyProvider>
        </>
    );
};

export default App;
