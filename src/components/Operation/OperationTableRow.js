import { Link } from "react-router-dom";
import { Button, Menu, Table } from "semantic-ui-react";
import { ErrorMessage } from "../Error";

const OperationTableRow = ({
  operation,
  deleteOperation,
  error,
  isDeleting,
}) => {
  return (
    <Table.Row>
      <Table.Cell>{operation.operationTypeName}</Table.Cell>
      <Table.Cell>{operation.storeName}</Table.Cell>
      <Table.Cell>{operation.productName}</Table.Cell>
      <Table.Cell>
        {operation.operationCount} {operation.measureUnitName}
      </Table.Cell>
      <Table.Cell>
        {operation.operationCount * operation.productRetailPrice} USD
      </Table.Cell>
      <Table.Cell>
        <Menu className="ui bottom attached" widths="2">
          <Menu.Item as={Link} to={`/operations/${operation.operationId}/edit`}>
            Edit
          </Menu.Item>
          {error ? (
            <Menu.Item>
              <ErrorMessage message={error} />
            </Menu.Item>
          ) : (
            <Menu.Item
              as={Button}
              onClick={() => deleteOperation(operation.operationId)}
              disabled={isDeleting}
            >
              Delete
            </Menu.Item>
          )}
        </Menu>
      </Table.Cell>
    </Table.Row>
  );
};

export default OperationTableRow;
