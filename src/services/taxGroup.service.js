import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `tax-groups`,
        method: "GET",
    })
}

const findByTaxGroupId = (taxGroupId) => {
    return request({
        url: `tax-groups/${taxGroupId}`,
        method: "GET",
    })
}

const TaxGroupService = {
    findByTaxGroupId, getAll
}

export default TaxGroupService;