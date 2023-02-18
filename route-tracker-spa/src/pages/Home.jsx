import DateSelector from "../components/DateSelector.jsx";
import MockupWindow from "../components/MockupWindow.jsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export const Home = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState(new Date());

    return (
        <div className={"flex flex-wrap"}>
            <div className={"w-2/3 flex-auto m-1"}>
                <MockupWindow titleContainer={<DateSelector date={{date, setDate}}/>}>
                    <p>placeholder</p>
                </MockupWindow>
            </div>
            <div className={"w-96 m-1 flex-auto text-center"}>
                <MockupWindow className={"mt-1"} titleContainer={t('home.newRoute')}>
                    <p>placeholder</p>
                </MockupWindow>
            </div>
        </div>

    );
};