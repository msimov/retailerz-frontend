export const USER_NOT_NULL = {
    condition: authUser => !!authUser,
    redirect: '/sign-in'
}
export const USER_NULL = {
    condition: authUser => authUser == null,
    redirect: '/home'
}
export const USER_HAS_DATA = {
    condition: authUser => authUser.data !== undefined,
    redirect: '/users/add'
};
export const USER_DATA_UNDEFINED = {
    condition: authUser => authUser.data === undefined,
    redirect: '/home'
}
export const USER_TYPE_RETAILER = {
    condition: authUser => authUser.data.type === 2,
    redirect: '/home'
}
export const USER_TYPE_CUSTOMER = {
    condition: authUser => authUser.data.type === 1,
    redirect: '/home'
}