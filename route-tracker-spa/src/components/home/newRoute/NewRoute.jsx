import MockupWindow from "../../shared/MockupWindow.jsx";
import ShowSelection from "./ShowSelection.jsx";
import {Button, Divider} from "react-daisyui";
import TimeSelector from "./TimeSelector.jsx";
import NewRouteInput from "./NewRouteInput.jsx";
import NewRouteSelection from "./NewRouteSelection.jsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const NewRoute = ({date}) => {
    const {t} = useTranslation();
    const [selectedWaypoints, setSelectedWaypoints] = useState([]);
    const [selectedPlates, setSelectedPlates] = useState([]);
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);
    const [waypoints] = useState(null);
    const [plates] = useState(null);

    const handleSave = () => {
        const data = {waypoints: {selectedWaypoints}, plates: {selectedPlates}, fromDate: fromDate, toDate: toDate}
        console.log(data);
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
            {waypoints
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
            {plates
                ?
                <div className={"m-5 min-h-8"}>
                    <NewRouteSelection selection={plates} addNewSelection={(newPlate) => {
                        setSelectedPlates([...selectedPlates, newPlate])
                    }}/>
                </div>
                :
                <></>
            }
            <Button size={"sm"} onClick={handleSave}>{t('home.save')}</Button>
        </MockupWindow>
    )
}
export default NewRoute;