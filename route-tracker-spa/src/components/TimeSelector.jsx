import {useState} from "react";
import {useTranslation} from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setLocale from "../utils/setLocale.js";

const TimeSelector = (props) => {
    const {i18n, t} = useTranslation();

    setLocale(i18n.language);

    return (
        <div className={"flex"}>
            <p className={"ml-2 mr-2"}>
                {props.title}:
            </p>
            <DatePicker
                className={"w-20"}
                selected={props.date}
                onChange={(date) => props.setDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                locale={i18n.language}
                timeCaption={t('home.time')}
                dateFormat={i18n.language === 'en' ? "h:mm aa" : "HH:mm"}
            />
        </div>
    );
}
export default TimeSelector;