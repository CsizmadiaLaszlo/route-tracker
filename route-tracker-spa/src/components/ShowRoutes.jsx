import {Badge} from "react-daisyui";

const ShowRoutes = ({routes}) => {
    return routes.map((route) => (
        <Badge key={route} className={"m-1"}>{route}</Badge>
    ))
}
export default ShowRoutes;