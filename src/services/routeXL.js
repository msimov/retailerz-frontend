import { routeXLRequest } from "../commons";

const generateRoute = (locations) => {
  return routeXLRequest({
    url: `tour`,
    method: "POST",
    data: "locations=" + JSON.stringify(locations),
  });
};

const RouteXLService = {
  generateRoute,
};

export default RouteXLService;
