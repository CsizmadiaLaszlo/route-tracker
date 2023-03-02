import {Table} from "react-daisyui";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from 'uuid';

const ShowRoutes = ({routes}) => {
    const {t} = useTranslation();

    return (
        <div className='overflow-x-auto'>
            <Table>
                <Table.Head>
                    <span/>
                    <span>{t('home.from')}</span>
                    <span>{t('home.to')}</span>
                    <span>{t('home.plate')}</span>
                    <span>{t('home.waypoint')}</span>
                </Table.Head>
                <Table.Body>
                    {routes.map((route) =>
                        <Table.Row key={uuid()} hover>
                            <span>{route.id}</span>
                            <span>{route.startDate.slice(0, 10)}</span>
                            <span>{route.endDate.slice(0, 10)}</span>
                            <span>{route['plates'].map((plate) => plate.name).join()}</span>
                            <span>{route['waypoints'].map((plate) => plate.name).join()}</span>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}
export default ShowRoutes;