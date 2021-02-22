import request from '../commons/request.common';

const getAll = () => {
    return request({
        url: `activity-types`,
        method: "GET",
    })
}

const ActivityTypeService = {
    getAll
}

export default ActivityTypeService;