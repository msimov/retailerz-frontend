import request from '../commons/request.common';

const create = (userId, group, userToken) => {
    return request({
        url: `users/${userId}/groups`,
        method: "POST",
        data: group,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `users/${userId}/groups`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, groupId, userToken) => {
    return request({
        url: `users/${userId}/groups/${groupId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, groupId, group, userToken) => {
    return request({
        url: `users/${userId}/groups/${groupId}`,
        method: "PUT",
        data: group,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, groupId, userToken) => {
    return request({
        url: `users/${userId}/groups/${groupId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const GroupService = {
    create, findById, getAll, updateById, deleteById
}

export default GroupService;