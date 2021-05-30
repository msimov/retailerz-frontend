import { request } from "../commons";

const create = (userId, user, userToken) => {
  return request({
    url: `users`,
    method: "POST",
    data: { userId, ...user },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAll = (userToken) => {
  return request({
    url: `users`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const findByUserId = (userId, userToken) => {
  return request({
    url: `users/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const updateByUserId = (userId, user, userToken) => {
  return request({
    url: `users/${userId}`,
    method: "PUT",
    data: user,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deleteByUserId = (userId, userToken) => {
  return request({
    url: `users/${userId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const UserService = {
  create,
  findByUserId,
  getAll,
  updateByUserId,
  deleteByUserId,
};

export default UserService;
