import {useEffect, useState} from "react";
import DateSelector from "../components/home/DateSelector.jsx";
import MockupWindow from "../components/shared/MockupWindow.jsx";
import NewRoute from "../components/home/newRoute/NewRoute.jsx";
import fetchWithToken from "../utils/fetchWithToken.js";
import {useMsal} from "@azure/msal-react";
import {Progress} from "react-daisyui";
import ShowRoutes from "../components/ShowRoutes.jsx";
import DateContext from "../context/DateContext.jsx";
import {getDaysOfWeek} from "../utils/dateTools.js";
import WeekContext from "../context/WeekContext.jsx";

export const Home = () => {
    const {instance} = useMsal();
    const [date, setDate] = useState(new Date());
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [routes, setRoutes] = useState(null)
    const [routesLoading, setRoutesLoading] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);

    useEffect(() => {
        setRoutesLoading(true);
        const endpoint = `routes?date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        fetchWithToken(instance, "GET", endpoint).then(r => {
                setRoutes(r);
                setRoutesLoading(false);
            }
        )
    }, [saveClicked, date])

    useEffect(() => {
        setDaysOfWeek(getDaysOfWeek(date))
    }, [date])

    return (
        <DateContext.Provider value={{date, setDate}}>
            <WeekContext.Provider value={{daysOfWeek, setDaysOfWeek}}>
                <div className={"flex flex-wrap"}>
                    <div className={"w-2/3 flex-auto m-1"}>
                        <MockupWindow titleContainer={
                            <DateSelector/>
                        }>
                            {routesLoading
                                ?
                                <Progress className="w-56"/>
                                :
                                routes
                                    ?
                                    <ShowRoutes routes={routes}/>
                                    :
                                    <></>
                            }
                        </MockupWindow>
                    </div>
                    <div className={"w-80 m-1 flex-auto text-center"}>
                        <NewRoute saveClicked={saveClicked} setSaveClicked={setSaveClicked}/>
                    </div>
                </div>
            </WeekContext.Provider>
        </DateContext.Provider>
    );
};