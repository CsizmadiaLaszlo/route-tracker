import {useEffect, useState} from "react";
import {BsMoon, BsSun} from "react-icons/bs";
import {themeChange} from "theme-change";
import {Button} from "react-daisyui";

const ThemeSwitch = () => {
    const [theme, setTheme] = useState("");
    const dark = "business";
    const light = "corporate";

    useEffect(() => {
        setTheme(localStorage.getItem("theme"))
    })

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        theme === "corporate" ?
            <Button data-set-theme={dark} onClick={() => setTheme(dark)} color="ghost" shape="circle">
                <BsSun/>
            </Button>
            :
            <Button data-set-theme={light} onClick={() => setTheme(light)} color="ghost" shape="circle">
                <BsMoon/>
            </Button>
    )
}
export default ThemeSwitch;