import {createContext} from "react";

const WeekContext = createContext({
    daysOfWeek: [],
    setDaysOfWeek: (days) => {}
});

export default WeekContext