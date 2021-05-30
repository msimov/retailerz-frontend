import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Menu } from "semantic-ui-react";

const SearchMenu = ({ setProducts }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    search: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();

    history.push("/search?text=" + formData.search);
  };

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Menu.Menu position="right">
      <Form onSubmit={onSubmit}>
        <Menu.Item>
          <Input
            icon="search"
            name="search"
            placeholder="Search..."
            onChange={onChange}
          />
        </Menu.Item>
      </Form>
    </Menu.Menu>
  );
};

export default SearchMenu;
