import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Menu } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ReportService } from "../../services";
import { ErrorMessage } from "../Error";
import { ReportContent } from "../Report";

const GroupCard = ({ group, deleteGroup, isDeleting, error }) => {
  const { authUser } = useContext(AuthUserContext);
  const [deliveries, setDeliveries] = useState(null);

  useEffect(() => {
    ReportService.deliveriesByProductGroup(
      authUser.uid,
      group.groupId,
      authUser.token
    ).then((res) => {
      setDeliveries(res.deliveries);
    });
  }, [authUser, group]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{group.groupName}</Card.Header>
      </Card.Content>
      <ReportContent
        title="Deliveries"
        value={deliveries}
        fixed={false}
        suffix={group.groupName}
      />
      <Menu className="ui bottom attached" widths="2">
        <Menu.Item as={Link} to={`/groups/${group.groupId}/edit`}>
          Edit
        </Menu.Item>
        <Menu.Item
          as={Button}
          onClick={() => deleteGroup(group.groupId)}
          disabled={isDeleting}
        >
          Delete
        </Menu.Item>
      </Menu>
      {error && <ErrorMessage message={error} />}
    </Card>
  );
};

export default GroupCard;
