import {Form, Input, Progress, WindowMockup} from "react-daisyui";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import fetchWithToken from "../utils/fetchWithToken.js";
import {loginRequest} from "../authConfig.js";
import {useMsal} from "@azure/msal-react";

const Settings = () => {
    const {t} = useTranslation();
    const {instance} = useMsal();
    const [loading, setLoading] = useState(true);
    const [hourlyRate, setHourlyRate] = useState(0.00);
    const [overtimeRate, setOvertimeRate] = useState(0.00);
    const [nightShiftRate, setNightShiftRate] = useState(0.00);

    const getTokenSilent = () => {
        const request = {
            ...loginRequest,
            account: instance.getActiveAccount()
        };
        return instance.acquireTokenSilent(request);
    }

    useEffect(() => {
        getTokenSilent().then((response) => {
            fetchWithToken(response.accessToken, "GET", "setting")
                .then(data => {
                    setHourlyRate(data['hourlyRate']);
                    setOvertimeRate(data['overtimeRate']);
                    setNightShiftRate(data['nightShiftRate']);
                    setLoading(false);
                })
        });
    }, [])

    const handleChange = (event) => {
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
        getTokenSilent().then((response) => {
            fetchWithToken(response.accessToken, "POST", "setting", data).then();
        });
    }

    return (
        <>
            <WindowMockup className={"w-80 container shadow-xl rounded-box bg-base-300"}>
                <div className="flex justify-center px-4  ">
                    {loading ?
                        <Progress className="w-56"/>
                        :
                        <Form className={"shadow bg-base-200 w-64 rounded-lg p-4"} onSubmit={handleSubmit}>

                            <Form.Label title={t('settings.hourlyRate')}></Form.Label>
                            <Input name={"hourlyRate"} className={"rounded-box"} type={"number"} step={0.01}
                                   value={hourlyRate}
                                   onChange={handleChange}/>

                            <Form.Label title={t('settings.overtimeRate')}></Form.Label>
                            <Input name={"overtimeRate"} className={"rounded-box"} type={"number"} step={0.01}
                                   value={overtimeRate}
                                   onChange={handleChange}/>

                            <Form.Label title={t('settings.nightShiftRate')}></Form.Label>
                            <Input name={"nightShiftRate"} className={"rounded-box bg-base-100"} type={"number"}
                                   step={0.01}
                                   value={nightShiftRate}
                                   onChange={handleChange}/>

                            <Input className={"rounded-box bg-base-100"} type={"submit"}
                                   value={t('settings.save')}></Input>
                        </Form>
                    }

                </div>
            </WindowMockup>
        </>
    )
}

export default Settings