const routeObjectBuilder = (waypoints, plates, fromDate, toDate) => {
    const waypointsObjects = waypoints.map((waypoint) => {
        return {Name: waypoint}
    });
    const platesObjects = plates.map((plate) => {
        return {Name: plate}
    });
    return {Waypoints: waypointsObjects, Plates: platesObjects, StartDate: fromDate, ToDate: toDate}
    // return {
    //     "Waypoints": [
    //         {
    //             "Name": "way1"
    //         },
    //         {
    //             "Name": "way2"
    //         }
    //     ],
    //     "Plates": [
    //         {
    //             "Name": "plate1"
    //         },
    //         {
    //             "Name": "plate2"
    //         }
    //     ],
    //     "StartDate": "2023-03-02T13:54:37.000Z",
    //     "EndDate": "2023-03-02T13:54:37.000Z"
    // }
}
export default routeObjectBuilder;