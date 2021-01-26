import request from '../commons/request.common';

const create = (operationUserId, operation, userToken) => {
    return request({
        url: `users/${operationUserId}/operations`,
        method: "POST",
        data: operation,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findByOperationId = (operationId, userToken) => {
    return request({
        url: `operations/${operationId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}
const getAllByUserId = (operationUserId, userToken) => {
    return request({
        url: `users/${operationUserId}/operations`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllByUserIdAndOperationTypeId = (operationUserId, operationTypeId, userToken) => {
    return request({
        url: `users/${operationUserId}/operations`,
        method: "GET",
        data: operationTypeId,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}


const updateByOperationId = (operationId, operation, userToken) => {
    return request({
        url: `operations/${operationId}`,
        method: "PUT",
        data: operation,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteByOperationId = (operationId, userToken) => {
    return request({
        url: `operations/${operationId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const OperationService = {
    create, findByOperationId, getAllByUserId, getAllByUserIdAndOperationTypeId, updateByOperationId, deleteByOperationId
}

export default OperationService;