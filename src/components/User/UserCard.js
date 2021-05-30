import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

const UserCard = ({ user }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {user.userFirstName + " " + user.userLastName}
        </Card.Header>
        <Card.Meta>
          <span>{user.userEmail}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/profile/edit`}>
          <Icon name="edit" />
          Edit Profile
        </Link>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/change-password`}>
          <Icon name="lock" />
          Change password
        </Link>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
