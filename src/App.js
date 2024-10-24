import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  MyProvider } from './store/Store';
import GlobalStyle from './globalStyles';
import language from './helper/i18n';
import { I18nextProvider } from 'react-i18next';
import Test from "./helper/test";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./components/organisms/Layout/Layout";
import Details from "./pages/MovieDetails/Details";
import ProtectedRoute from "./helper/ProtectedRoute";
import Person from "./pages/Person/Person";
import Search from "./pages/Search/Search";
import Company from "./pages/Company/Company";
import Keyword from "./pages/Keyword/Keyword";




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
                            <Route path="/:lang/person/:personId" element={<ProtectedRoute><Person /></ProtectedRoute>} />
                            <Route path="/:lang/search" element={<ProtectedRoute><Search/></ProtectedRoute>} />
                            <Route path="/:lang/company/:company_id/movie" element={<ProtectedRoute><Company/></ProtectedRoute>} />
                            <Route path="/:lang/keyword/:keyword_id/movie" element={<ProtectedRoute><Keyword/></ProtectedRoute>} />
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
