import {Badge} from "react-daisyui";
import { v4 as uuid } from 'uuid';

const ShowSelection = ({selection}) => {
    return selection.map((route) => (
        <Badge key={uuid()} className={"m-1"}>{route}</Badge>
    ))
}
export default ShowSelection;