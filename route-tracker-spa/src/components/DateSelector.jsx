import DatePicker, {registerLocale} from "react-datepicker";
import {forwardRef} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {useTranslation} from "react-i18next";
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
import hu from 'date-fns/locale/hu';
import {modfiyeDateDay} from "../utils/dateTools.js";


const DateSelector = (props) => {
    const {date, setDate} = props.date;
    const {i18n, t} = useTranslation();

    const CustomInput = forwardRef(({value, onClick}, ref) => (
        <div className={"flex items-center"}>
            <AiOutlineLeft className={"cursor-pointer"} onClick={() => {
                setDate(modfiyeDateDay(date, -1))
            }}/>
            <button className="custom-input w-64 pr-5 pl-5 select-none" onClick={onClick} ref={ref}>
                <p>{t('home.date', {date})}</p>
            </button>
            <AiOutlineRight className={"cursor-pointer"} onClick={() => {
                setDate(modfiyeDateDay(date, 1))
            }}/>
        </div>
    ));

    switch (i18n.language) {
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

    return (
        <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            locale={i18n.language}
            customInput={<CustomInput/>}
        />
    );
}
export default DateSelector;