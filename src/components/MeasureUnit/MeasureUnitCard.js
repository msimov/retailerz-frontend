import { Link } from "react-router-dom";
import { Button, Card, Menu } from "semantic-ui-react";
import { ErrorMessage } from "../Error";

const MeasureUnitCard = ({
  measureUnit,
  deleteMeasureUnit,
  isDeleting,
  error,
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{measureUnit.measureUnitName}</Card.Header>
      </Card.Content>
      <Menu className="ui bottom attached" widths="2">
        <Menu.Item
          as={Link}
          to={`/measure-units/${measureUnit.measureUnitId}/edit`}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          as={Button}
          onClick={() => deleteMeasureUnit(measureUnit.measureUnitId)}
          disabled={isDeleting}
        >
          Delete
        </Menu.Item>
      </Menu>
      {error && <ErrorMessage message={error} />}
    </Card>
  );
};

export default MeasureUnitCard;
