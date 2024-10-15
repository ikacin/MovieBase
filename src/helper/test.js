
import { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';


const Test = () => {
    const navigate = useNavigate();
    const { lang } = useParams();

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];

        if (!lang) {
            navigate(`/${browserLang}`, { replace: true });
        }
    }, [navigate, lang]);

};

export default Test;
