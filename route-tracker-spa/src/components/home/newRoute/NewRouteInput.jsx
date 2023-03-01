import {Button, Input} from "react-daisyui";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const NewRouteInput = ({addNewInput}) => {
    const {t} = useTranslation();
    const [newRouteValue, setNewRouteValue] = useState("")

    return (
        <>
            {t('home.routeInputText')}
            <div className={"flex justify-center"}>
                <Input value={newRouteValue} onChange={(e) => setNewRouteValue(e.target.value)} size={"xs"}/>
                <Button size={"xs"} onClick={() => {
                    if (newRouteValue !== "") addNewInput(newRouteValue);
                    setNewRouteValue("");
                }}>+</Button>
            </div>
        </>
    )
}
export default NewRouteInput;