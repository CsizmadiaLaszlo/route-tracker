import {useEffect, useState} from "react";
import {BsMoon, BsSun} from "react-icons/bs";
import {Button} from "react-daisyui";

const ThemeSwitch = () => {
    const [theme, setTheme] = useState("");
    const dark = "business";
    const light = "corporate";

    useEffect(() => {
        if (localStorage.getItem("theme"))
        setTheme(localStorage.getItem("theme"));
    },[])

    useEffect(() => {
        localStorage.setItem("theme", theme);
    },[theme])
    const handleClick = (theme) => {
        const doc = document.querySelector("html");
        doc.setAttribute('data-theme', theme);
        setTheme(theme);
    }

    return (
        theme === "corporate" ?
            <Button data-set-theme={dark} onClick={() => handleClick(dark)} color="ghost" shape="circle">
                <BsSun/>
            </Button>
            :
            <Button data-set-theme={light} onClick={() => handleClick(light)} color="ghost" shape="circle">
                <BsMoon/>
            </Button>
    )
}
export default ThemeSwitch;