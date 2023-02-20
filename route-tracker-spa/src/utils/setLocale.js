import {registerLocale} from "react-datepicker";
import en from "date-fns/locale/en-US";
import hu from "date-fns/locale/hu";
import de from "date-fns/locale/de";

const setLocale = (language) => {
    switch (language) {
        case 'en':
            registerLocale('en', en);
            break
        case 'hu':
            registerLocale('hu', hu);
            break
        case 'de':
            registerLocale('de', de);
            break
    }
}

export default setLocale;