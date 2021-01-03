import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `operation-types`,
        method: "GET",
    })
}

const findById = (operationTypeId) => {
    return request({
        url: `operation-types`,
        method: "GET",
    })
}

const OperationTypeService = {
    findById, getAll
}

export default OperationTypeService;