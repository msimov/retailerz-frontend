import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthUserContext } from "../context";

const withAuthorization = (conditions) => (Component) => {
  const WithAuthorization = (props) => {
    const history = useHistory();
    const { authUser } = useContext(AuthUserContext);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const failedCondition = conditions.find(
        (condition) => !condition.rule(authUser)
      );
      if (failedCondition === undefined) {
        setIsAuthorized(true);
      } else {
        history.push(failedCondition.redirect);
        setIsAuthorized(false);
      }
    }, [history, authUser]);

    return isAuthorized ? <Component {...props} /> : null;
  };
  return WithAuthorization;
};

export default withAuthorization;
