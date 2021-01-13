import request from '../commons/request.common';

const create = (userId, storeId, storeProduct, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}/products`,
        method: "POST",
        data: storeProduct,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllByStoreId = (userId, storeId, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}/products`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}


const deleteByStoreIdAndProductId = (userId, storeId, productId, userToken) => {
    return request({
        url: `users/${userId}/stores/${storeId}/products/${productId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const StoreProductService = {
    create, getAllByStoreId, deleteByStoreIdAndProductId
}

export default StoreProductService;