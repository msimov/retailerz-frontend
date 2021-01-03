import request from '../commons/request.common';

const create = (userId, operation, userToken) => {
    return request({
        url: `users/${userId}/operations`,
        method: "POST",
        data: operation,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `users/${userId}/operations`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, operationId, userToken) => {
    return request({
        url: `users/${userId}/operations/${operationId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, operationId, operation, userToken) => {
    return request({
        url: `users/${userId}/operations/${operationId}`,
        method: "PUT",
        data: operation,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, operationId, userToken) => {
    return request({
        url: `users/${userId}/operations/${operationId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const OperationService = {
    create, findById, getAll, updateById, deleteById
}

export default OperationService;