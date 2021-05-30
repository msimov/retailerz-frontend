import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { GroupsList } from "../../components/Group";
import { ListLayout } from "../../layouts";

const Groups = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Groups</Menu.Item>
          <Menu.Item as={Link} to={`/groups/add`}>
            Add New Group
          </Menu.Item>
        </Menu>
      }
      list={<GroupsList />}
    />
  );
};

export default Groups;
