const routeObjectBuilder = (waypoints, plates, fromDate, toDate) => {
    const waypointsObjects = waypoints.map((waypoint) => {
        return {Name: waypoint}
    });
    const platesObjects = plates.map((plate) => {
        return {Name: plate}
    });
    return {Waypoints: waypointsObjects, Plates: platesObjects, StartDate: fromDate, EndDate: toDate}
}
export default routeObjectBuilder;