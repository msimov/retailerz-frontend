import request from '../commons/request.common';

const create = (groupUserId, group, userToken) => {
    return request({
        url: `users/${groupUserId}/groups`,
        method: "POST",
        data: group,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findByGroupId = (groupId, userToken) => {
    return request({
        url: `groups/${groupId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllByUserId = (groupUserId, userToken) => {
    return request({
        url: `users/${groupUserId}/groups`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateByGroupId = (groupId, group, userToken) => {
    return request({
        url: `groups/${groupId}`,
        method: "PUT",
        data: group,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteByGroupId = (groupId, userToken) => {
    return request({
        url: `groups/${groupId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const GroupService = {
    create, findByGroupId, getAllByUserId, updateByGroupId, deleteByGroupId
}

export default GroupService;