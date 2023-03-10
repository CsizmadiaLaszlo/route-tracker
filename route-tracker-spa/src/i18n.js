import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';
import moment from "moment";

export const languages = {
    en: {nativeName: 'English'},
    hu: {nativeName: 'Magyar'},
    de: {nativeName: 'Deutsch'}
};

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    }).then();

i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

i18n.services.formatter.add('TIME', (value, lng, options) => {
    if (lng !== "en"){
        return moment(value, 'HH:mm').locale(lng).format('HH:mm');
    }
    return moment(value, 'HH:mm').locale(lng).format('h:mm A');
});

export default i18n;