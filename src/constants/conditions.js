import * as ROUTES from './routes';

export const USER_NOT_NULL = {
    condition: authUser => !!authUser,
    redirect: ROUTES.SIGN_IN
}
export const USER_NULL = {
    condition: authUser => authUser == null,
    redirect: ROUTES.HOME
}
export const USER_HAS_DATA = {
    condition: authUser => authUser.data !== undefined,
    redirect: `${ROUTES.USERS}/add`
};
export const USER_DATA_UNDEFINED = {
    condition: authUser => authUser.data === undefined,
    redirect: ROUTES.HOME
}
export const USER_TYPE_RETAILER = {
    condition: authUser => authUser.data.type === 2,
    redirect: ROUTES.HOME
}
export const USER_TYPE_CUSTOMER = {
    condition: authUser => authUser.data.type === 1,
    redirect: ROUTES.HOME
}