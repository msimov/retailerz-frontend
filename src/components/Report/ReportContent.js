import { Card } from "semantic-ui-react";

const ReportContent = ({ title, value, fixed, suffix }) => {
  return (
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>
        {value
          ? fixed
            ? value.toFixed(2) + " " + suffix
            : value + " " + suffix
          : "Not Enough Data"}
      </Card.Meta>
    </Card.Content>
  );
};
ReportContent.defaultProps = {
  fixed: true,
};

export default ReportContent;
