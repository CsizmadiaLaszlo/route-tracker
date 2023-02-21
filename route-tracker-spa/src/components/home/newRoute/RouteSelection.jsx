import {Badge} from "react-daisyui";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {mockRoutes} from "../../../backEndDataMock.js";

const RouteSelection = ({addNewRoute}) => {
    const {t} = useTranslation();
    const [routes] = useState(mockRoutes);

    return (
        <>
            {t('home.routeSelectionText')}
            <div className={"flex flex-wrap justify-center"}>
                {routes.map((route) => (
                    <Badge key={route}
                           className={"m-1 cursor-cell"}
                           onClick={() => addNewRoute(route)}>{route}</Badge>
                ))}
            </div>
        </>
    )
}
export default RouteSelection;