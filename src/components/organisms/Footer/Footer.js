import React, {useContext} from 'react';
import styled from 'styled-components';
import logo from '../../../assests/image/footer-image.svg';
import {useParams } from 'react-router-dom';
import {MyContext} from "../../../store/Store";

const Footer = () => {
    const{state,dispatch} = useContext(MyContext);
    const {lang} = useParams()

    return (
        <FooterContainer>
            <Navigation>
                <div className="join">
                    <img src={logo} alt="The Movie Database (TMDB)" width="130" height="94"/>
                    <a className="rounded" href={`/${lang}/signup`}>
                        {state?.authorization?.name
                            ? `Merhaba ${state.authorization.name}`
                            : "Foruma Katılın"
                        }
                    </a>
                </div>

                <div>
                    <h3>Temel</h3>
                    <ul>
                        <li><a href="/about">TMDB Hakkında</a></li>
                        <li><a href="/about/staying-in-touch">Bize Ulaşın</a></li>
                        <li><a href="/talk">Destek Forumları</a></li>
                        <li><a href="https://developer.themoviedb.org/docs" target="_blank" rel="noopener">API</a></li>
                        <li><a href="https://status.themoviedb.org/" target="_blank" rel="noopener">Sistem Durumu</a></li>
                    </ul>
                </div>

                <div>
                    <h3>Katkıda Bulunun</h3>
                    <ul>
                        <li><a href="/bible"><span className="glyphicons glyphicons-asterisk"></span> Katılım Başvuru Kitabı</a></li>
                        <li><a href="/movie/new">Yeni Film Ekle</a></li>
                        <li><a href="/tv/new">Yeni Dizi Ekle</a></li>
                    </ul>
                </div>

                <div>
                    <h3>Topluluk</h3>
                    <ul>
                        <li><a href="/documentation/community/guidelines">Rehberler</a></li>
                        <li><a href="/discuss">Tartışmalar</a></li>
                        <li><a href="/leaderboard">Öne Çıkanlar</a></li>
                    </ul>
                </div>

                <div>
                    <h3>Yasal</h3>
                    <ul>
                        <li><a href="/terms-of-use">Kullanım Koşulları</a></li>
                        <li><a href="/api-terms-of-use">API Kullanım Şartları</a></li>
                        <li><a href="/privacy-policy">Gizlilik Politikası</a></li>
                        <li><a href="/dmca-policy">DMCA Siyaseti</a></li>
                    </ul>
                </div>
            </Navigation>
        </FooterContainer>
    );
};




const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  background-color: #07253f;
  color: #ffffff;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;

  .join {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
  }
  
  .rounded {
    background-color: #fff;
    color:#228be6;
    font-size: 1.3em;
    display: inline-block;
    word-wrap: break-word;
    white-space: normal;
    text-decoration: none;
    border: 2px solid #fff;
    border-radius: 5px;
    padding: 3px 16px;
    transition: linear .1s;
    margin-top: 40px;
    font-weight: bold;
  }
  
  div {
    h3 {
      margin-bottom: 10px;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        margin-bottom: 5px;
      }

      a {
        text-decoration: none;
        color: #ffffff;

        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

export default Footer;
