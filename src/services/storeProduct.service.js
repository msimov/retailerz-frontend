import request from '../commons/request.common';

const create = (storeId, storeProduct, userToken) => {
    return request({
        url: `stores/${storeId}/products`,
        method: "POST",
        data: storeProduct,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const getAllByStoreId = (storeId, userToken) => {
    return request({
        url: `stores/${storeId}/products`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}


const deleteByStoreIdAndProductId = (storeId, productId, userToken) => {
    return request({
        url: `stores/${storeId}/products/${productId}`,
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