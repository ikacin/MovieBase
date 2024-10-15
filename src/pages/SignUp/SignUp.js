import React, {useState, useContext} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import { Input } from '@mantine/core';
import { Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import CustomButton from "../../components/atoms/CustomButton";
import LangButton from "../../components/atoms/LangButton";
import Footer from "../../components/organisms/Footer/Footer";
import { IconArrowBackUp } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import CustomPaper from "../../components/atoms/Box";
import {MyContext} from "../../store/Store";
import { showNotification,updateNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import Photo from "../../helper/Photo";
const SignUp = () => {
    const { t } = useTranslation();
    const [once, setOnce] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const { state, dispatch } = useContext(MyContext);
    const handleCancel = () => {
            navigate("/")
    }

    const gotoHome = () => {
        navigate("/")
    }

    const handleSubmit  =  (e) => {
        e.preventDefault()

        if (username.trim() === ""){
            setUsernameError('Kullanıcı adı boş olamaz');
        }else {
            setUsernameError('');
        }

        if (password.length < 6) {
            setPasswordError('Şifre en az 6 karakter olmalıdır');
        } else {
            setPasswordError('');
        }

        if (passwordConfirmation !== password) {
            setPasswordConfirmationError('Şifreler uyuşmuyor');
        } else {
            setPasswordConfirmationError('');
        }

        if (passwordConfirmation.trim() === ''){
            setPasswordConfirmationError('Password Onay Boş Olamaz');
        }else{
            setPasswordConfirmationError('')
        }


        if (!email.includes('@')) {
            setEmailError('Geçerli bir e-posta adresi giriniz');
        } else {
            setEmailError('');
        }

        if (username !== "" && password !==  "" && password === passwordConfirmation && email ? email : "") {
            if (once){

                setOnce(false)
                dispatch({type: "SET_AUTHORIZATION", payload: {
                        authorization: {username: username,email:email, isLogin: true},

                    }})
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    body: {
                        title: username,
                        body: email,
                        userId: 1,
                    },
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(function (response) {
                        showNotification({
                            id: 'load-data',
                            autoClose: false,
                            disallowclose: true,
                            loading: true,
                            title:"Please Wait",
                        })
                        setTimeout(() => {
                            updateNotification({
                                id: 'load-data',
                                color: 'teal',
                                title:"Success",
                                message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                                icon: <IconCheck size="1rem" />,
                                autoClose: 1000,
                            });
                        }, 1000);
                        localStorage.setItem("username",username)
                        localStorage.setItem("email",email)
                        setTimeout(() => gotoHome(), 3000);
                    })
                    .catch(function (error) {
                        showNotification({
                            id: 'hello-there',
                            disallowclose: false,
                            autoClose: 5000,
                            title:"Success",
                            message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                            color: 'white',
                            icon: <IconX size="1rem" />,
                            className: 'my-notification-class',
                            style: { backgroundColor: 'red' },
                            sx: { backgroundColor: 'red' },
                            loading: false,
                        });
                    });


            }
        } else {
            console.log('input value is empty');

            showNotification({
                id: 'hello-there',
                disallowclose: false,
                autoClose: 5000,
                title: t("input_empty"),
                message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                color: 'red',
                icon: <IconX size="1rem" />,
                className: 'my-notification-class',
                style: { backgroundColor: 'white' },
                sx: { backgroundColor: 'white' },
                loading: false,
            });
        }
    }


    return(
        <StyledBox>
            <Photo/>
            <LangButton/>
                <Container size={"xl"} display={"flex"}  pb={"50px"}  pt={"30px"} >

                        <CustomPaper shadow={"xl"}
                                     title={t("benefits_member")}
                                     type={"list"}
                                     color={"#ffffff"}
                                     background={"#01b4e4"}
                                     padding={"20px"}
                                     fontSize={"20px"}
                                     borderradius={"5px 5px 0 0" }
                                     textFirst={t("sing_up_first")}
                                     textSecond={t("sing_up_second")}
                                     textThird={t("sing_up_third")}
                                     textFourth={t("sing_up_fourty")}
                                     textFifth={t("sing_up_fifth")}
                                     textSixth={t("sing_up_sixth")}
                                     textSeventh={t("sing_up_seventh")}

                        />



                    <Container size={"xl"} pl={"30px"} w={"980px"}>
                      <form onSubmit={handleSubmit}>
                        <LoginHeader>
                            <div>{t("create_account")}</div>
                            <div>{t("sign_text")}</div>

                        </LoginHeader>

                        <InputHeader>
                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("login_username")}
                                error={usernameError}

                            >
                                <Input id="input-demo"
                                       placeholder={t("login_username")}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("login_password")}
                                error={passwordError}

                            >
                                <Input id="input-demo"
                                       placeholder={t("login_password")}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("password_confirmation")}
                                error={passwordConfirmationError}

                            >
                                <Input id="input-demo"
                                       placeholder={t("password_confirmation")}
                                       onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("email")}
                                error={emailError}

                            >
                                <Input id="input-demo"
                                       placeholder={t("email")}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </Input.Wrapper>
                        </InputHeader>
                        <FooterText>
                            {t("sign_click")}
                        </FooterText>
                        <FooterHeader >
                            <CustomButton
                                children={t("sign_up")}
                                leftIcon={<IconUser/>}
                                type="submit"
                            />
                            <CustomButton color={"red"}
                                          children={t("Cancel")}
                                          leftIcon={<IconArrowBackUp/>}
                                          variant={"outline"}
                                          onClick={() => handleCancel()}
                            />

                        </FooterHeader>
                        </form>
                    </Container>

                </Container>

            <Footer/>
        </StyledBox>

    )
}


const StyledBox = styled.div`
   
`

const InputHeader = styled.div`


`


const LoginHeader = styled.div`
  div:nth-child(1){
    font-size: 24px;
    font-weight: bold;
  }
  div:nth-child(2) {
    padding-top: 8px;
  }
`
const FooterHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 20px;
  
`

const FooterText = styled.div`
  white-space: nowrap;

`


export default SignUp