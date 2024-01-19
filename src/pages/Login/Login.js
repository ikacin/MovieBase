import Header from "../../components/organisms/Header/Header";
import styled from 'styled-components';
import { Input } from '@mantine/core';
import { Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import CustomButton from "../../components/atoms/CustomButton";
const Login = () => {
    const { t, i18n } = useTranslation();
        return(
          <StyledBox>
              <Header/>
              <Container  size="xl" px={"15px"} pt={"50px"}>
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

                  <FooterHeader>
                      <CustomButton children={t("login")}  />
                      <Link>{t("reset_password")}</Link>
                  </FooterHeader>
              </Container>


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


const Link = styled.a`
  color: #228be6;
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  
`
export default Login