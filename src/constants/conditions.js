export const USER_NOT_NULL = {
  rule: (authUser) => !!authUser,
  redirect: "/sign-in",
};
export const USER_NULL = {
  rule: (authUser) => authUser == null,
  redirect: "/profile",
};
export const USER_HAS_DATA = {
  rule: (authUser) => authUser.data !== undefined,
  redirect: "/profile/add",
};
export const USER_DATA_UNDEFINED = {
  rule: (authUser) => authUser.data === undefined,
  redirect: "/profile",
};
export const USER_TYPE_RETAILER = {
  rule: (authUser) => authUser.data.userUserTypeId === 2,
  redirect: "/profile",
};
export const USER_TYPE_CUSTOMER = {
  rule: (authUser) => authUser.data.userUserTypeId === 1,
  redirect: "/profile",
};
