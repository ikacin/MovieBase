// App.js
import React, {  } from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import { MyContext, MyProvider } from './store/Store';
import GlobalStyle from './globalStyles';
import language from './helper/i18n';
import { I18nextProvider } from 'react-i18next';
import Test from "./helper/test";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./components/organisms/Layout/Layout";
import Details from "./pages/MovieDetails/Details";
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
                                        <Route path="/:lang" element={<Layout/> }/>
                                        <Route path="/:lang/movie/:movieId" element={<Details/> }/>
                                        <Route path="/" element={<Test />} />
                                        <Route exact path="/:lang/login" element={<Login/>} />
                                        <Route exact path="/:lang/signup" element={<SignUp/>} />
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
