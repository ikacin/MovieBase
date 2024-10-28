import {useState,useContext } from "react";
import styled from 'styled-components';
import { Input } from '@mantine/core';
import { Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import CustomButton from "../../components/atoms/CustomButton";
import LangButton from "../../components/atoms/LangButton";
import Footer from "../../components/organisms/Footer/Footer";
import { IconPasswordMobilePhone } from '@tabler/icons-react';
import { IconUserFilled } from '@tabler/icons-react';
import {useNavigate, useParams} from "react-router-dom";
import {MyContext} from "../../store/Store";
const Login = () => {
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const {lang} = useParams()
    const { state,dispatch } = useContext(MyContext);
    const goHome = () => {
        let isValid = true;

        // Username validation (e.g., must be an email)
        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!usernameRegex.test(username)) {
            setUsernameError(t("error_invalid_email"));
            isValid = false;
        } else {
            setUsernameError("");
        }

        // Password validation (e.g., minimum 6 characters)
        const passwordRegex = /^.{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(t("error_password_too_short"));
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            dispatch({
                type: 'SET_AUTHORIZATION',
                payload: {
                    id: Date.now(),
                    name: username ? username.split("@")[0] : "",
                    email: username,
                    date: new Date().toISOString()
                }
            });
            console.log(state)
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            navigate(`/${lang}`);
        }

    }

   const handleReset = () => {
       setUsername("");
       setPassword("")
       setUsernameError("");
       setPasswordError("");
   }



        return(
          <div>
              <LangButton/>
              <Container  size="xl" px={"15px"} pt={"50px"} pb={"50px"}>
                  <LoginHeader>
                      <div>{t("language_settings")}</div>
                      <div>{t("login_account_text")}</div>
                      <div>{t("login_account_email")}</div>
                  </LoginHeader>
                    <div>
                        <Input.Wrapper
                            mt="xl"
                            id="input-demo"
                            label={t("login_username")}
                            error={usernameError}
                        >
                            <Input
                                id="input-demo"
                                placeholder={t("login_username")}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Input.Wrapper>

                        <Input.Wrapper
                            mt="xl"
                            id="input-demo"
                            label={t("login_password")}
                            error={passwordError}
                        >
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("login_password")} />
                        </Input.Wrapper>
                    </div>

                  <FooterHeader >
                      <CustomButton
                          children={t("login")}
                          leftIcon={<IconUserFilled/>}
                          onClick={() => goHome()}
                          hoverBackground={"#bebebb"}
                      />
                      <CustomButton
                          color={"red"}
                          children={t("clean")}
                          leftIcon={<IconPasswordMobilePhone/>}
                          variant={"outline"}
                          onClick={() => handleReset()}
                      />
                  </FooterHeader>
              </Container>

            <Footer/>
          </div>

        )
}


const LoginHeader = styled.div`
  div:nth-child(2){
    margin-top: 10px;
  }
  div:nth-child(3) {
   margin: 30px 0;
  }
`
const FooterHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 20px;
  
`

export default Login