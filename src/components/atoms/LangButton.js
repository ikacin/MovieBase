import i18n from 'i18next';
import React, { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../organisms/Header/Header";


const LangButton = ({}) => {
    const { t } = useTranslation();
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
            <Header onClick={() => handleButtonClick()}/>
        </div>
    );
};

export default LangButton;
