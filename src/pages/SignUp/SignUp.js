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
const SignUp = () => {
    const { t, i18n } = useTranslation();
    return(
        <StyledBox>
            <LangButton/>
                <Container size={"xl"} display={"flex"}  pb={"50px"}  pt={"30px"} >

                        <CustomPaper shadow={"xl"}
                                     title={t("benefits_member")}
                                     type={"list"}
                                     color={"#ffffff"}
                                     background={"#01b4e4"}
                                     padding={"20px"}
                                     fontSize={"20px"}
                                     borderRadius={"5px 5px 0 0" }
                                     textFirst={t("sing_up_first")}
                                     textSecond={t("sing_up_second")}
                                     textThird={t("sing_up_third")}
                                     textFourth={t("sing_up_fourty")}
                                     textFifth={t("sing_up_fifth")}
                                     textSixth={t("sing_up_sixth")}
                                     textSeventh={t("sing_up_seventh")}

                        />



                    <Container size={"xl"} pl={"30px"} w={"980px"}>
                        <LoginHeader>
                            <div>{t("create_account")}</div>
                            <div>{t("sign_text")}</div>

                        </LoginHeader>
                        <InputHeader>
                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("login_username")}
                                error="Your credit card expired"
                            >
                                <Input id="input-demo" placeholder={t("login_username")} />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("login_password")}
                                error="Your credit card expired"
                            >
                                <Input id="input-demo" placeholder={t("login_password")} />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("password_confirmation")}
                                error="Your credit card expired"
                            >
                                <Input id="input-demo" placeholder={t("password_confirmation")} />
                            </Input.Wrapper>

                            <Input.Wrapper
                                mt="xl"
                                id="input-demo"
                                label={t("email")}
                                error="Your credit card expired"
                            >
                                <Input id="input-demo" placeholder={t("email")} />
                            </Input.Wrapper>
                        </InputHeader>
                        <FooterText>
                            {t("sign_click")}
                        </FooterText>
                        <FooterHeader >
                            <CustomButton children={t("sign_up")}  leftIcon={<IconUser/>}/>
                            <CustomButton color={"red"}  children={t("Cancel")}  leftIcon={<IconArrowBackUp/>} variant={"outline"}/>

                        </FooterHeader>
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