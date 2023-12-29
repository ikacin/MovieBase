
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';


const Test = () => {
    const navigate = useNavigate();
    const { lang } = useParams();

    useEffect(() => {
        // Eğer URL'de dil parametresi yoksa, tarayıcı dilini kullan
        const browserLang = navigator.language.split('-')[0];

        if (!lang) {
            // URL'de dil parametresi yoksa ve tarayıcı dilinden farklıysa, tarayıcı dilini kullanarak URL'yi güncelle
            navigate(`/${browserLang}`, { replace: true });
        }
    }, [navigate, lang]);

};

export default Test;
