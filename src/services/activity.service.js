import request from '../commons/request.common';

const create = (activityUserId, activity, userToken) => {
    return request({
        url: `users/${activityUserId}/activities`,
        method: "POST",
        data: activity,
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
}

const ActivityService = {
    create
}

export default ActivityService;