import {Badge} from "react-daisyui";
import {useTranslation} from "react-i18next";

const NewRouteSelection = ({selection, addNewSelection}) => {
    const {t} = useTranslation();

    return (
        <>
            {t('home.routeSelectionText')}
            <div className={"flex flex-wrap justify-center"}>
                {selection.map((s) => (
                    <Badge key={s.id}
                           className={"m-1 cursor-cell"}
                           onClick={() => addNewSelection(s.name)}>{s.name}</Badge>
                ))}
            </div>
        </>
    )
}
export default NewRouteSelection;