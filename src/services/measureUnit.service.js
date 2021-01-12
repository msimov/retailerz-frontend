import request from '../commons/request.common';

const create = (userId, measureUnit, userToken) => {
    return request({
        url: `users/${userId}/measure-units`,
        method: "POST",
        data: measureUnit,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `users/${userId}/measure-units`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, measureUnitId, userToken) => {
    return request({
        url: `users/${userId}/measure-units/${measureUnitId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, measureUnitId, measureUnit, userToken) => {
    return request({
        url: `users/${userId}/measure-units/${measureUnitId}`,
        method: "PUT",
        data: measureUnit,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, measureUnitId, userToken) => {
    return request({
        url: `users/${userId}/measure-units/${measureUnitId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const MeasureUnitService = {
    create, findById, getAll, updateById, deleteById
}

export default MeasureUnitService;