import {useState} from "react";
import DateSelector from "../components/home/DateSelector.jsx";
import MockupWindow from "../components/shared/MockupWindow.jsx";
import NewRoute from "../components/home/newRoute/NewRoute.jsx";

export const Home = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className={"flex flex-wrap"}>
            <div className={"w-2/3 flex-auto m-1"}>
                <MockupWindow titleContainer={<DateSelector date={{date, setDate}}/>}>
                </MockupWindow>
            </div>
            <div className={"w-80 m-1 flex-auto text-center"}>
                <NewRoute date={date}/>
            </div>
        </div>
    );
};