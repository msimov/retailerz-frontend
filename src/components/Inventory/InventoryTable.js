import React, { useState, useEffect, useContext } from "react";
import { Table } from "semantic-ui-react";
import { InventoryProductTableRow } from ".";
import { AuthUserContext } from "../../context";
import { OperationService, OperationTypeService } from "../../services";
import { ErrorMessage } from "../Error";

const InventoryTable = () => {
  const { authUser } = useContext(AuthUserContext);
  const [inventory, setInventory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    OperationTypeService.getAll().then((res) => {
      OperationService.getInventory(authUser.uid, authUser.token)
        .then((res) => {
          setInventory(res);
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

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Store</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {inventory &&
          inventory.map((inventoryProduct, index) => {
            return (
              <InventoryProductTableRow
                key={index}
                inventoryProduct={inventoryProduct}
              />
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default InventoryTable;
