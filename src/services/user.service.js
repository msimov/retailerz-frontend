import request from '../commons/request.common';

const create = (userId, user, userToken) => {
    return request({
        url: `users`,
        method: "POST",
        data: {id: userId, ...user},
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userToken) => {
    return request({
        url: `users`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, userToken) => {
    return request({
        url: `users/${userId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, user, userToken) => {
    return request({
        url: `users/${userId}`,
        method: "PUT",
        data: user,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, userToken) => {
    return request({
        url: `users/${userId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const UserService = {
    create, findById, getAll, updateById, deleteById
}

export default UserService;