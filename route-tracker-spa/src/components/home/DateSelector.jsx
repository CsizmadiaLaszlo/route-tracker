import {forwardRef, useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import DatePicker from "react-datepicker";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {modfiyeDateDay} from "../../utils/dateTools.js";
import "react-datepicker/dist/react-datepicker.css";
import setLocale from "../../utils/setLocale.js";
import DateContext from "../../context/DateContext.jsx";

const DateSelector = () => {
    const {date, setDate} = useContext(DateContext)
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

    setLocale(i18n.language);

    return (
        <DatePicker
            selected={date}
            onChange={(date) => {
                setDate(date);
            }}
            locale={i18n.language}
            customInput={<CustomInput/>}
        />
    );
}
export default DateSelector;