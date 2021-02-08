import routeXLRequest from '../commons/routeXLRequest.common';

const generateRoute = (locations) => {
    return routeXLRequest({
        url: `tour`,
        method: "POST",
        data: "locations=" + JSON.stringify(locations),
    })
}

const RouteXLService = {
    generateRoute
}

export default RouteXLService;