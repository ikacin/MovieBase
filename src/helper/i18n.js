import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const localePaths = {
    en: '../../public/locales/en/translation.json',
    tr: '../../public/locales/tr/translation.json',
};


const resources = {
    en: {
        translation: {
            welcome: "Welcome Json",
            change_lang: "Change lang",
            logout: "LogOut",
            language_used_english: "Language Used English",
            language_used_turkish: "Language Used Turkish",
            Notification_close: "Notification will close in 2 seconds, you can close this notification now",
            Success: "Success",
            Unsuccessful: "Operation Failed",
            Please_wait: "Please Wait",
            Active_language: "Active Language",
            Submit: "Submit",
            Cancel: "Cancel",
            films: "Films",
            series: "Series",
            persons: "Persons",
            see_more: "See More",
            language_settings:"Language Settings",
            default_language:"Default Language",
            return_language:"Return Language",
            refresh_page:"Refresh Page"
        },
    },
    tr: {
        translation: {
            hello: 'Merhaba',
            welcomeMessage: 'Uygulamama hoş geldiniz!',
            welcome: "Hoş geldiniz Json",
            change_lang: "Dili Değiştir",
            logout: "Çıkış",
            language_used_english: "Kullanılan Dil İngilizce",
            language_used_turkish: "Kullanılan Dil Türkçe",
            Notification_close: "Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
            Success: "İşlem Başarıyla Gerçekleştirildi",
            Unsuccessful: "Operation Failed",
            Please_wait: "Lütfen Bekleyiniz",
            Active_language: "Aktif Dil",
            Submit: "Gönder",
            Cancel: "Vazgeç",
            films: "Filmler",
            persons: "Kişiler",
            see_more: "Daha Fazla",
            language_settings:"Dil Ayarları",
            default_language:"Varsayılan Dil",
            return_language:"Geri Dönüş Dili",
            refresh_page:"Sayfayı Yenile"
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });


export default i18n