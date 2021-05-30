import React, { useState, useEffect, useContext } from "react";
import { Table } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { OperationService, OperationTypeService } from "../../services";
import { ErrorMessage } from "../Error";
import CartOperationTableRow from "./CartOperationTableRow";

const CartTable = () => {
  const { authUser } = useContext(AuthUserContext);
  const [operations, setOperations] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    OperationTypeService.getAll().then((res) => {
      const addToCartOperation = res.find(
        ({ operationTypeName }) => operationTypeName === "ADD_TO_CART"
      );
      OperationService.getAllByUserIdAndOperationTypeId(
        authUser.uid,
        addToCartOperation.operationTypeId,
        authUser.token
      )
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
    });
  }, [authUser]);

  const removeFromCart = (operationId) => {
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
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Store</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {operations &&
          operations.map((cartOperation, index) => {
            return (
              <CartOperationTableRow
                key={index}
                cartOperation={cartOperation}
                removeFromCart={removeFromCart}
                error={deleteError}
                isDeleting={isDeleting}
              />
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default CartTable;
