import {Badge} from "react-daisyui";

const ShowSelection = ({selection}) => {
    return selection.map((route) => (
        <Badge key={route} className={"m-1"}>{route}</Badge>
    ))
}
export default ShowSelection;