import { useContext, useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { ReportContent } from "../Report";
import { AuthUserContext } from "../../context";
import { ReportService } from "../../services";
import { ErrorMessage } from "../Error";

const TotalProfitCard = () => {
  const { authUser } = useContext(AuthUserContext);
  const [error, setError] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);

  useEffect(() => {
    ReportService.totalProfit(authUser.uid, authUser.token)
      .then((res) => {
        setTotalProfit(res.totalProfit);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card>
      <ReportContent title="Total Profit" value={totalProfit} suffix="USD" />
    </Card>
  );
};

export default TotalProfitCard;
