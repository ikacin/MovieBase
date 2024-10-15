import i18n from 'i18next';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../organisms/Header/Header";


const LangButton = () => {
    const { lang } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);



    const handleButtonClick = () => {
        const newLang = lang === 'tr' ? 'en' : 'tr';
        navigate(`/${newLang}`);
    };


    return (
        <div>
            <Header onchange={() => handleButtonClick()}/>
        </div>
    );
};

export default LangButton;
