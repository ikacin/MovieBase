import styled from 'styled-components';
import { Input } from '@mantine/core';
import { Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import CustomButton from "../../components/atoms/CustomButton";
import LangButton from "../../components/atoms/LangButton";
import Footer from "../../components/organisms/Footer/Footer";
import { IconPasswordMobilePhone } from '@tabler/icons-react';
import { IconUserFilled } from '@tabler/icons-react';
const Login = () => {
    const { t, i18n } = useTranslation();
        return(
          <StyledBox>
              <LangButton/>
              <Container  size="xl" px={"15px"} pt={"50px"} pb={"50px"}>
                  <LoginHeader>
                      <div>{t("language_settings")}</div>
                      <div>{t("login_account_text")}</div>
                      <div>{t("login_account_email")}</div>
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
                    </InputHeader>

                  <FooterHeader >
                      <CustomButton children={t("login")}  leftIcon={<IconUserFilled/>}/>
                      <CustomButton color={"red"}  children={t("reset_password")}  leftIcon={<IconPasswordMobilePhone/>} variant={"outline"}/>

                  </FooterHeader>
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