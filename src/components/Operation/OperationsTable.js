import React, { useState, useEffect, useContext } from "react";
import { Table } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { OperationService } from "../../services";
import { ErrorMessage } from "../Error";
import OperationTableRow from "./OperationTableRow";

const OperationsTable = () => {
  const { authUser } = useContext(AuthUserContext);
  const [operations, setOperations] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    OperationService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setOperations(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  const deleteOperation = (operationId) => {
    setIsDeleting(true);
    OperationService.deleteByOperationId(operationId, authUser.token)
      .then(() => {
        setIsDeleting(false);
        setOperations((operations) =>
          operations.filter(
            (operation) => operation.operationId !== operationId
          )
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
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Store</Table.HeaderCell>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {operations &&
          operations.map((operation, index) => {
            return (
              <OperationTableRow
                key={index}
                operation={operation}
                deleteOperation={deleteOperation}
                error={deleteError}
                isDeleting={isDeleting}
              />
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default OperationsTable;
