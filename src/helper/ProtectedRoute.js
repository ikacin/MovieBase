import {useNavigate, useParams} from "react-router-dom";
import {useEffect,useContext} from "react";
import {MyContext} from "../store/Store";

const ProtectedRoute = ({ children }) => {
    const { lang } = useParams();
    const navigate = useNavigate();
    const{state} = useContext(MyContext);

    useEffect(() => {
        const authToken = state.authorization;
        if (!authToken || Object.values(authToken).some(value => value === null)) {
            navigate(`/${lang}/login`);
        }
    }, [navigate, lang]);

    return children;
};

export default ProtectedRoute