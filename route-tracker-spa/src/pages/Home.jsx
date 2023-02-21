import {useState} from "react";
import {useTranslation} from "react-i18next";
import DateSelector from "../components/home/DateSelector.jsx";
import MockupWindow from "../components/shared/MockupWindow.jsx";
import TimeSelector from "../components/home/newRoute/TimeSelector.jsx";
import ShowRoutes from "../components/home/newRoute/ShowRoutes.jsx";
import NewRouteInput from "../components/home/newRoute/NewRouteInput.jsx";
import RouteSelection from "../components/home/newRoute/RouteSelection.jsx";

export const Home = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);

    const [selectedRoutes, setSelectedRoutes] = useState([]);

    const addNewRouteToSelection = (newRoute) => {
        setSelectedRoutes([...selectedRoutes, newRoute])
    }

    return (
        <div className={"flex flex-wrap"}>
            <div className={"w-2/3 flex-auto m-1"}>
                <MockupWindow titleContainer={<DateSelector date={{date, setDate}}/>}>
                </MockupWindow>
            </div>
            <div className={"w-96 m-1 flex-auto text-center"}>
                <MockupWindow className={"mt-1"} titleContainer={t('home.newRoute')}>
                    <div className={"flex flex-wrap mb-5 min-h-16 justify-center"}>
                        <ShowRoutes routes={selectedRoutes}/>
                    </div>
                    <div className={"flex m-5 m-h-8 justify-center"}>
                        <TimeSelector title={t('home.from')} date={fromDate} setDate={setFromDate}/>
                        <TimeSelector title={t('home.to')} date={toDate} setDate={setToDate}/>
                    </div>
                    <div className={"m-5 min-h-8"}>
                        <NewRouteInput addNewRoute={addNewRouteToSelection}/>
                    </div>
                    <div className={"m-5 min-h-8"}>
                        <RouteSelection addNewRoute={addNewRouteToSelection}/>
                    </div>
                </MockupWindow>
            </div>
        </div>
    );
};