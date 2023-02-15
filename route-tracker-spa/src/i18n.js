import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
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
        },
        resources: {

            // English
            en: {
                translation: {
                    description: {
                        part1: 'Welcome',
                        part2: 'You must login in order to use the website',
                        part3: 'login',
                    }
                }
            },
            // Hungarian
            hu: {
                translation: {
                    description: {
                        part1: 'Üdvözöllek',
                        part2: 'A weboldal használatához be kell jelentkeznie.',
                        part3: 'bejelentkezés',
                    }
                }
            },
            // Deutsch
            de: {
                translation: {
                    description: {
                        part1: 'Willkommen',
                        part2: 'Sie müssen sich anmelden, um die Website zu nutzen.',
                        part3: 'anmeldung',
                    }
                }
            }
        }
    }).then();

export default i18n;