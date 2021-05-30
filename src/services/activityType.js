import { request } from "../commons";

const getAll = () => {
  return request({
    url: `activity-types`,
    method: "GET",
  });
};

const ActivityTypeService = {
  getAll,
};

export default ActivityTypeService;
