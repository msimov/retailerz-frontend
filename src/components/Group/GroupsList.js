import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { GroupCard } from ".";
import { AuthUserContext } from "../../context";
import { GroupService } from "../../services";
import { ErrorMessage } from "../Error";

const GroupsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    GroupService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setGroups(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  const deleteGroup = (groupId) => {
    setIsDeleting(true);

    GroupService.deleteByGroupId(groupId, authUser.token)
      .then(() => {
        setIsDeleting(false);
        setGroups((groups) =>
          groups.filter((group) => group.groupId !== groupId)
        );
      })
      .catch((err) => {
        setIsDeleting(false);
        if (typeof err.data === "string") {
          setDeleteError(err.data);
        } else {
          setDeleteError(err.data.message);
        }
      });
  };

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card.Group centered>
      {groups &&
        groups.map((group, index) => (
          <GroupCard
            key={index}
            group={group}
            deleteGroup={deleteGroup}
            error={deleteError}
            isDeleting={isDeleting}
          />
        ))}
    </Card.Group>
  );
};

export default GroupsList;
