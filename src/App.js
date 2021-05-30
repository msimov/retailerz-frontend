import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuthentication, withAuthorization } from "./hoc";
import routes from "./routes";

const App = () => {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={withAuthorization(route.conditions)(route.component)}
        />
      ))}
    </Router>
  );
};

export default withAuthentication(App);
