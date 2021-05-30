import { useContext, useEffect, useState } from "react";
import { GridRow } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { UserService } from "../../services";
import UserCard from "./UserCard";

const UserInfo = () => {
  const { authUser } = useContext(AuthUserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.findByUserId(authUser.uid, authUser.token).then((res) => {
      setUser({
        userId: authUser.uid,
        userEmail: authUser.email,
        ...res,
      });
    });
  }, [authUser]);

  return user ? (
    <GridRow>
      <UserCard user={user} />
    </GridRow>
  ) : (
    <div>Loading...</div>
  );
};

export default UserInfo;
