import { request } from "../commons";

const create = (operationUserId, operation, userToken) => {
  return request({
    url: `users/${operationUserId}/operations`,
    method: "POST",
    data: operation,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const findByOperationId = (operationId, userToken) => {
  return request({
    url: `operations/${operationId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllByUserId = (operationUserId, userToken) => {
  return request({
    url: `users/${operationUserId}/operations`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllByUserIdAndOperationTypeId = (
  operationUserId,
  operationTypeId,
  userToken
) => {
  return request({
    url: `users/${operationUserId}/operations/${operationTypeId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getInventory = (operationUserId, userToken) => {
  return request({
    url: `users/${operationUserId}/inventory`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const updateByOperationId = (operationId, operation, userToken) => {
  return request({
    url: `operations/${operationId}`,
    method: "PUT",
    data: operation,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deleteByOperationId = (operationId, userToken) => {
  return request({
    url: `operations/${operationId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const OperationService = {
  create,
  findByOperationId,
  getAllByUserId,
  getAllByUserIdAndOperationTypeId,
  getInventory,
  updateByOperationId,
  deleteByOperationId,
};

export default OperationService;
