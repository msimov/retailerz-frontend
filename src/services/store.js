import { request } from "../commons";

const create = (storeUserId, store, userToken) => {
  return request({
    url: `users/${storeUserId}/stores`,
    method: "POST",
    data: store,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllByUserId = (storeUserId, userToken) => {
  return request({
    url: `users/${storeUserId}/stores`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const findByStoreId = (storeId, userToken) => {
  return request({
    url: `stores/${storeId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const updateByStoreId = (storeId, store, userToken) => {
  return request({
    url: `stores/${storeId}`,
    method: "PUT",
    data: store,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deleteByStoreId = (storeId, userToken) => {
  return request({
    url: `stores/${storeId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const StoreService = {
  create,
  findByStoreId,
  getAllByUserId,
  updateByStoreId,
  deleteByStoreId,
};

export default StoreService;
