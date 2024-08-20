import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { MyContext, MyProvider } from './store/Store';
import GlobalStyle from './globalStyles';
import language from './helper/i18n';
import { I18nextProvider } from 'react-i18next';
import Test from "./helper/test";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./components/organisms/Layout/Layout";
import Details from "./pages/MovieDetails/Details";
import ProtectedRoute from "./helper/ProtectedRoute";


const App = () => {
    return (
        <MyProvider>
            <div className="App">
                <GlobalStyle />
                <I18nextProvider i18n={language}>
                    <Router>
                        <Routes>
                            <Route path="/:lang" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
                            <Route path="/:lang/movie/:movieId" element={<ProtectedRoute><Details /></ProtectedRoute>} />
                            <Route path="/" element={<Test />} />
                            <Route path="/:lang/login" element={<Login />} />
                            <Route path="/:lang/signup" element={<SignUp />} />
                        </Routes>
                    </Router>
                </I18nextProvider>
            </div>
        </MyProvider>
    );
};

export default App;
