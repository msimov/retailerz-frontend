import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `tax-groups`,
        method: "GET",
    })
}

const findById = (taxGroupId) => {
    return request({
        url: `tax-groups/${taxGroupId}`,
        method: "GET",
    })
}

const TaxGroupService = {
    findById, getAll
}

export default TaxGroupService;