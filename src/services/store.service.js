import request from '../commons/request.common';

const create = (userId, store, userToken) => {
    return request({
        url: `users/${userId}/stores`,
        method: "POST",
        data: store,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `users/${userId}/stores`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, storeId, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, storeId, store, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}`,
        method: "PUT",
        data: store,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, storeId, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const StoreService = {
    create, findById, getAll, updateById, deleteById
}

export default StoreService;