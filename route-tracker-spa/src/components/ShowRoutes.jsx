import {Badge, Table} from "react-daisyui";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from 'uuid';

const ShowRoutes = ({routes}) => {
    const {t} = useTranslation();

    return (
        <div className='overflow-x-auto'>
            <Table>
                <Table.Head>
                    <span>{t('home.time')}</span>
                    <span>{t('home.plate')}</span>
                    <span>{t('home.waypoint')}</span>
                </Table.Head>

                <Table.Body>
                    {routes.map((route) =>
                        <Table.Row key={uuid()}>
                            <div className={"flex flex-col"}>
                                <span>{t('time', {time: route.startDate.slice(11, 16)})}</span>
                                <span>{t('time', {time: route.endDate.slice(11, 16)})}</span>
                            </div>
                            <div className={"flex flex-wrap max-w-[200px]"}>
                                {route['plates'].map((plate) => <Badge className={"m-1"}
                                                                       key={uuid()}>{plate.name}</Badge>)}
                            </div>
                            <div className={"flex flex-wrap max-w-[200px]"}>
                                {route['waypoints'].map((waypoint) => <Badge className={"m-1"}
                                                                             key={uuid()}>{waypoint.name}</Badge>)}
                            </div>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

// const ShowRoutes = ({routes}) => {
//     const {t} = useTranslation();
//
//     return (
//         routes.map((route) =>
//             <div key={uuid()}>
//                 <Hero className="hover:bg-base-300">
//                     <Hero.Content className="text-center">
//                         <div className="max-w-md">
//                             {/*<h4 className="text-l font-bold">{t('time', {time: route.startDate.slice(11, 16)})} - {t('time', {time: route.endDate.slice(11, 16)})}</h4>*/}
//                             <div className={"flex flex-wrap"}>
//                                 <h4 className="text-l font-bold">
//                                     {t('time', {time: route.startDate.slice(11, 16)})}
//                                 </h4>
//                                 <p>{"-"}</p>
//                                 <h4 className="text-l font-bold">
//                                     {t('time', {time: route.endDate.slice(11, 16)})}
//                                 </h4>
//                             </div>
//                             <div className={"flex flex-wrap"}>
//                                 {route['waypoints'].map((waypoint) => <Badge className={"m-1"}
//                                 key={uuid()}>{waypoint.name}</Badge>)}
//                             </div>
//                             <div className={"flex flex-wrap"}>
//                                 {route['plates'].map((plate) => <Badge className={"m-1"} key={uuid()}>{plate.name}</Badge>)}
//                             </div>
//                         </div>
//                     </Hero.Content>
//                 </Hero>
//             </div>
//         )
//     )
// }
export default ShowRoutes;