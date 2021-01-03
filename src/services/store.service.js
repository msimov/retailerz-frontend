import request from '../commons/request.common';

const create = (store, userToken) => {
    return request({
        url: `/users/${userId}/stores`,
        method: "POST",
        data: store,
        config: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `/users/${userId}/stores`,
        method: "GET",
        config: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (storeId, userToken) => {
    return request({
        url: `/users/${userId}/stores/${storeId}`,
        method: "GET",
        config: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, storeId, store, userToken) => {
    return request({
        url: `/users/${userId}/stores/${storeId}`,
        method: "PUT",
        data: store,
        config: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, storeId, userToken) => {
    return request({
        url: `/users/${userId}/stores/${storeId}`,
        method: "DELETE",
        config: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const UserService = {
    create, findById, getAll, updateById, deleteById
}

export default UserService;