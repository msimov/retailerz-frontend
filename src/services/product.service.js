import request from '../commons/request.common';


const search = (search, userToken) => {
    return request({
        url: `products`,
        method: "GET",
        params: {search},
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const create = (productUserId, product, userToken) => {
    return request({
        url: `users/${productUserId}/products`,
        method: "POST",
        data: product,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllByUserId = (productUserId, userToken) => {
    return request({
        url: `users/${productUserId}/products`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllRecommendedByUserId = (userId, userToken) => {
    return request({
        url: `users/${userId}/products/recommended`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const findByProductId = (productId, userToken) => {
    return request({
        url: `products/${productId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const updateByProductId = (productId, newProduct, userToken) => {
    return request({
        url: `products/${productId}`,
        method: "PUT",
        data: newProduct,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const deleteByProductId = (productId, userToken) => {
    return request({
        url: `products/${productId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const ProductService = {
    search, create, findByProductId, getAllByUserId, getAllRecommendedByUserId, updateByProductId, deleteByProductId
}

export default ProductService;