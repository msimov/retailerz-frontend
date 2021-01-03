import request from '../commons/request.common';

const create = (userId, product, userToken) => {
    return request({
        url: `users/${userId}/products`,
        method: "POST",
        data: product,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAll = (userId, userToken) => {
    return request({
        url: `users/${userId}/products`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findById = (userId, productId, userToken) => {
    return request({
        url: `users/${userId}/products/${productId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateById = (userId, productId, product, userToken) => {
    return request({
        url: `users/${userId}/products/${productId}`,
        method: "PUT",
        data: product,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteById = (userId, productId, userToken) => {
    return request({
        url: `users/${userId}/products/${productId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const ProductService = {
    create, findById, getAll, updateById, deleteById
}

export default ProductService;