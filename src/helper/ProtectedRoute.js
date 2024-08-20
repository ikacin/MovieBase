import {useNavigate, useParams} from "react-router-dom";
import {useEffect,useContext} from "react";
import {MyContext} from "../store/Store";

const ProtectedRoute = ({ children }) => {
    const { lang } = useParams();
    const navigate = useNavigate();
    const{state} = useContext(MyContext);

    useEffect(() => {
        const authToken = localStorage.getItem('username');
        if (!authToken) {
            navigate(`/${lang}/login`);
        }
    }, [navigate, lang]);

    return children;
};

export default ProtectedRoute