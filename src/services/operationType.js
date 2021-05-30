import { request } from "../commons";

const findByOperationTypeId = (operationTypeId) => {
  return request({
    url: `operation-types/${operationTypeId}`,
    method: "GET",
  });
};

const getAll = () => {
  return request({
    url: `operation-types`,
    method: "GET",
  });
};

const OperationTypeService = {
  findByOperationTypeId,
  getAll,
};

export default OperationTypeService;
