import {createContext} from "react";

const DateContext = createContext({
    date: new Date(),
    setDate: (newDate) => {}
});

export default DateContext