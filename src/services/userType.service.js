import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `user-types`,
        method: "GET",
    })
}

const findByUserTypeId = (userTypeId) => {
    return request({
        url: `user-types/${userTypeId}`,
        method: "GET",
    })
}

const UserTypeService = {
    findByUserTypeId, getAll
}

export default UserTypeService;