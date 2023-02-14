import {useEffect} from "react";
import {themeChange} from 'theme-change'

export const Home = () => {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <>
            <center>
                Welcome
            </center>
        </>
    );
};