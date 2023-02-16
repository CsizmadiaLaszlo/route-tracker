import {Input, WindowMockup} from "react-daisyui";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const Settings = () => {
    const {t} = useTranslation();
    const [hourlyRate, setHourlyRate] = useState(0.00);
    const [overtimeRate, setOvertimeRate] = useState(0.00);
    const [nightShiftRate, setNightShiftRate] = useState(0.00);


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

    return (
        <>
            <WindowMockup className={"w-96 container shadow-xl rounded-box bg-base-300"}>
                <div className="flex justify-center px-4  ">
                    <div className="form-control w-full max-w-xs">

                        <label className="label">
                            <span className="label-text">{t('settings.hourlyRate')}</span>
                        </label>
                        <Input name={"hourlyRate"} className={"rounded-box"} type={"number"} step={0.01}
                               value={hourlyRate}
                               onChange={handleChange}/>

                        <label className="label">
                            <span className="label-text">{t('settings.overtimeRate')}</span>
                        </label>
                        <Input name={"overtimeRate"} className={"rounded-box"} type={"number"} step={0.01}
                               value={overtimeRate}
                               onChange={handleChange}/>

                        <label className="label">
                            <span className="label-text">{t('settings.nightShiftRate')}</span>
                        </label>
                        <Input name={"nightShiftRate"} className={"rounded-box bg-base-100"} type={"number"} step={0.01}
                               value={nightShiftRate}
                               onChange={handleChange}/>
                        <br/>
                        <Input type={"submit"}></Input>
                    </div>
                </div>
            </WindowMockup>
        </>
    )
}

export default Settings