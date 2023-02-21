import {Form, Input, Progress} from "react-daisyui";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import fetchWithToken from "../utils/fetchWithToken.js";
import {useMsal} from "@azure/msal-react";
import MockupWindow from "../components/MockupWindow.jsx";

const Settings = () => {
    const {t} = useTranslation();
    const {instance} = useMsal();
    const [loading, setLoading] = useState(true);
    const [hourlyRate, setHourlyRate] = useState(0.00);
    const [overtimeRate, setOvertimeRate] = useState(0.00);
    const [nightShiftRate, setNightShiftRate] = useState(0.00);

    useEffect(() => {
        fetchWithToken(instance, "GET", "setting")
            .then(data => {
                setHourlyRate(data['hourlyRate']);
                setOvertimeRate(data['overtimeRate']);
                setNightShiftRate(data['nightShiftRate']);
                setLoading(false);
            });

    }, [])

    const handleValueChange = (event) => {
        const target = event.target;
        const targetValue = event.target.value;
        switch (target.name) {
            case "hourlyRate":
                setHourlyRate(targetValue)
                break
            case "overtimeRate":
                setOvertimeRate(targetValue)
                break
            case "nightShiftRate":
                setNightShiftRate(targetValue)
                break
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {HourlyRate: hourlyRate, OvertimeRate: overtimeRate, NightShiftRate: nightShiftRate};
        fetchWithToken(instance, "PUT", "setting", data).then();
    }

    return (
        <div className="flex justify-center px-4">
            <div className={"w-96"}>
                <MockupWindow titleContainer={t('settings.title')}>
                    {loading ?
                        <Progress className="w-56"/>
                        :
                        <Form className={"p-4"} onSubmit={handleSubmit}>

                            <Form.Label title={t('settings.hourlyRate')}></Form.Label>
                            <Input name={"hourlyRate"} className={"rounded-box"} type={"number"} step={0.01}
                                   value={hourlyRate}
                                   onChange={handleValueChange}/>

                            <Form.Label title={t('settings.overtimeRate')}></Form.Label>
                            <Input name={"overtimeRate"} className={"rounded-box"} type={"number"} step={0.01}
                                   value={overtimeRate}
                                   onChange={handleValueChange}/>

                            <Form.Label title={t('settings.nightShiftRate')}></Form.Label>
                            <Input name={"nightShiftRate"} className={"rounded-box bg-base-100"} type={"number"}
                                   step={0.01}
                                   value={nightShiftRate}
                                   onChange={handleValueChange}/>

                            <Input className={"rounded-box bg-base-100"} type={"submit"}
                                   value={t('settings.save')}></Input>
                        </Form>
                    }
                </MockupWindow>
            </div>
        </div>
    )
}

export default Settings