import { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { AuthUserContext, FirebaseContext } from "../../../context";

const ProfileDropdown = () => {
  const firebase = useContext(FirebaseContext);
  const { authUser } = useContext(AuthUserContext);
  return (
    <Dropdown item icon="user" simple text="Profile">
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          My Profile
        </Dropdown.Item>
        {authUser.data.userUserTypeId === 1 ? (
          <>
            <Dropdown.Item as={Link} to="/cart">
              My Cart
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/recommended-products">
              My Recommended Products
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/favorite-products">
              My Favorite Products
            </Dropdown.Item>
          </>
        ) : null}
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/profile/edit">
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/change-password">
          Change Password
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => firebase.doSignOut()}>
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
