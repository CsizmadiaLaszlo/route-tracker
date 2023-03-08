import MockupWindow from "../../shared/MockupWindow.jsx";
import ShowSelection from "./ShowSelection.jsx";
import {Button, Divider, Progress} from "react-daisyui";
import TimeSelector from "./TimeSelector.jsx";
import NewRouteInput from "./NewRouteInput.jsx";
import NewRouteSelection from "./NewRouteSelection.jsx";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import fetchWithToken from "../../../utils/fetchWithToken.js";
import {useMsal} from "@azure/msal-react";
import routeObjectBuilder from "../../../utils/routeObjectBuilder.js";
import DateContext from "../../../context/DateContext.jsx";

const NewRoute = ({saveClicked, setSaveClicked}) => {
    const {t} = useTranslation();
    const {date} = useContext(DateContext)
    const [selectedWaypoints, setSelectedWaypoints] = useState([]);
    const [selectedPlates, setSelectedPlates] = useState([]);
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);
    const [waypoints, setWaypoints] = useState(null);
    const [waypointsLoading, setWaypointsLoading] = useState(false);
    const [plates, setPlates] = useState(null);
    const [platesLoading, setPlatesLoading] = useState(false)
    const {instance} = useMsal();

    useEffect(() => {
        setWaypointsLoading(true);
        setPlatesLoading(true);
        fetchWithToken(instance, "GET", "waypoint")
            .then(r => {
                setWaypoints(r.length === 0 ? null : r);
                setWaypointsLoading(false);
            })
    }, [saveClicked])

    useEffect(() => {
        setPlatesLoading(true);
        fetchWithToken(instance, "GET", "plate")
            .then(r => {
                setPlates(r.length === 0 ? null : r);
                setPlatesLoading(false);
            })
    }, [saveClicked])

    const handleSave = () => {
        const route = routeObjectBuilder(selectedWaypoints, selectedPlates, fromDate, toDate);
        fetchWithToken(instance, "POST", "route", route).then(() => {
            setSaveClicked(!saveClicked);
            setSelectedWaypoints([]);
            setSelectedPlates([]);
            setFromDate(date);
            setToDate(date);
        });
    }

    return (
        <MockupWindow className={"mt-1"} titleContainer={t('home.newRoute')}>
            <Divider>{t('home.time')}</Divider>
            <div className={"flex m-5 m-h-8 justify-center"}>
                <TimeSelector title={t('home.from')} date={fromDate} setDate={setFromDate}/>
                <TimeSelector title={t('home.to')} date={toDate} setDate={setToDate}/>
            </div>
            <Divider>{t('home.waypoint')}</Divider>
            <div className={"flex flex-wrap mb-5 min-h-8 justify-center"}>
                <ShowSelection selection={selectedWaypoints}/>
            </div>
            <div className={"m-5 min-h-8"}>
                <NewRouteInput addNewInput={(newRoute) => {
                    setSelectedWaypoints([...selectedWaypoints, newRoute])
                }}/>
            </div>
            {waypointsLoading
                ?
                <Progress className="w-56"/>
                :
                waypoints
                    ?
                    <div className={"m-5 min-h-8"}>
                        <NewRouteSelection selection={waypoints} addNewSelection={(newRoute) => {
                            setSelectedWaypoints([...selectedWaypoints, newRoute])
                        }}/>
                    </div>
                    :
                    <></>
            }

            <Divider>{t('home.plate')}</Divider>
            <div className={"flex flex-wrap mb-5 min-h-8 justify-center"}>
                <ShowSelection selection={selectedPlates}/>
            </div>
            <div className={"m-5 min-h-8"}>
                <NewRouteInput addNewInput={(newPlate) => {
                    setSelectedPlates([...selectedPlates, newPlate])
                }}/>
            </div>
            {platesLoading
                ?
                <Progress className="w-56"/>
                :
                plates
                    ?
                    <div className={"m-5 min-h-8"}>
                        <NewRouteSelection selection={plates} addNewSelection={(newPlate) => {
                            setSelectedPlates([...selectedPlates, newPlate])
                        }}/>
                    </div>
                    :
                    <></>
            }
            <div>
                <Button size={"sm"} onClick={handleSave}>{t('home.save')}</Button>
            </div>
        </MockupWindow>
    )
}
export default NewRoute;