import { request } from "../commons";

const totalProfit = (userId, userToken) => {
  return request({
    url: `/users/${userId}/total-profit`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const totalProfitForStore = (userId, storeId, userToken) => {
  return request({
    url: `/users/${userId}/stores/${storeId}/total-profit`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const totalProfitForProduct = (userId, productId, userToken) => {
  return request({
    url: `/users/${userId}/products/${productId}/profit`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const totalProfitForProductForStore = (
  userId,
  storeId,
  productId,
  userToken
) => {
  return request({
    url: `/users/${userId}/stores/${storeId}/products/${productId}/profit`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const mostSearchedProducts = (userId, userToken) => {
  return request({
    url: `/users/${userId}/products/most-searched`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const salesByDates = (userId, userToken) => {
  return request({
    url: `/users/${userId}/sales-by-dates`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const salesByDatesForStore = (userId, storeId, userToken) => {
  return request({
    url: `/users/${userId}/stores/${storeId}/sales-by-dates`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const quantitySoldForProduct = (userId, productId, userToken) => {
  return request({
    url: `/users/${userId}/products/${productId}/quantity-sold`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const quantitySoldForProductForStore = (
  userId,
  storeId,
  productId,
  userToken
) => {
  return request({
    url: `/users/${userId}/stores/${storeId}/products/${productId}/quantity-sold`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deliveriesByProductGroup = (userId, groupId, userToken) => {
  return request({
    url: `/users/${userId}/groups/${groupId}/deliveries`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const ReportService = {
  totalProfit,
  totalProfitForStore,
  totalProfitForProduct,
  totalProfitForProductForStore,
  mostSearchedProducts,
  salesByDates,
  salesByDatesForStore,
  quantitySoldForProduct,
  quantitySoldForProductForStore,
  deliveriesByProductGroup,
};

export default ReportService;
