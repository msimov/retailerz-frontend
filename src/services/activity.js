import { request } from "../commons";

const create = (activityUserId, activity, userToken) => {
  return request({
    url: `users/${activityUserId}/activities`,
    method: "POST",
    data: activity,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllByUserId = (activityUserId, userToken) => {
  return request({
    url: `users/${activityUserId}/activities`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deleteByActivityId = (activityId, userToken) => {
  return request({
    url: `activities/${activityId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const ActivityService = {
  create,
  getAllByUserId,
  deleteByActivityId,
};

export default ActivityService;
