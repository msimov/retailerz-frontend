import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `user-types`,
        method: "GET",
    })
}

const findById = (userTypeId) => {
    return request({
        url: `user-types/${userTypeId}`,
        method: "GET",
    })
}

const UserTypeService = {
    findById, getAll
}

export default UserTypeService;