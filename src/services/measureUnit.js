import { request } from "../commons";

const create = (measureUnitUserId, measureUnit, userToken) => {
  return request({
    url: `users/${measureUnitUserId}/measure-units`,
    method: "POST",
    data: measureUnit,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const findByMeasureUnitId = (measureUnitId, userToken) => {
  return request({
    url: `measure-units/${measureUnitId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllByUserId = (measureUnitUserId, userToken) => {
  return request({
    url: `users/${measureUnitUserId}/measure-units`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const updateByMeasureUnitId = (measureUnitId, measureUnit, userToken) => {
  return request({
    url: `measure-units/${measureUnitId}`,
    method: "PUT",
    data: measureUnit,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deleteByMeasureUnitId = (measureUnitId, userToken) => {
  return request({
    url: `measure-units/${measureUnitId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const MeasureUnitService = {
  create,
  findByMeasureUnitId,
  getAllByUserId,
  updateByMeasureUnitId,
  deleteByMeasureUnitId,
};

export default MeasureUnitService;
