import { Redirect } from "react-router";
import {
  USER_DATA_UNDEFINED,
  USER_HAS_DATA,
  USER_NOT_NULL,
  USER_NULL,
  USER_TYPE_CUSTOMER,
  USER_TYPE_RETAILER,
} from "./constants/conditions";
import { AddToCart, Cart } from "./pages/Cart";
import { ChangePassword } from "./pages/ChangePassword";
import { FastestRoute } from "./pages/FastestRoute";
import { AddEditGroup, Groups } from "./pages/Group";
import { Inventory } from "./pages/Inventory";
import { AddEditMeasureUnit, MeasureUnits } from "./pages/MeasureUnit";
import { AddEditOperation, Operations } from "./pages/Operation";
import { AddEditProduct, Products } from "./pages/Product";
import { AddEditProfile, Profile } from "./pages/Profile";
import { RecommendedProducts } from "./pages/RecommendedProducts";
import { ResetPassword } from "./pages/ResetPassword";
import { Search } from "./pages/Search";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AddEditStore, Stores } from "./pages/Store";
import { AddStoreProduct, StoreProducts } from "./pages/StoreProduct";
import { TotalProfit } from "./pages/TotalProfit";
import { MostSearchedProducts } from "./pages/MostSearchedProducts";
import { FavoriteProducts } from "./pages/FavoriteProducts";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/sign-in" />,
    conditions: [USER_NULL],
  },
  {
    path: "/cart",
    component: Cart,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_CUSTOMER],
  },
  {
    path: "/fastest-route",
    component: FastestRoute,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_CUSTOMER],
  },
  {
    path: "/recommended-products",
    component: RecommendedProducts,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_CUSTOMER],
  },
  {
    path: "/favorite-products",
    component: FavoriteProducts,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_CUSTOMER],
  },
  {
    path: "/change-password",
    component: ChangePassword,
    conditions: [USER_NOT_NULL, USER_HAS_DATA],
  },
  {
    path: "/groups",
    exact: true,
    component: Groups,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/groups/add",
    component: AddEditGroup,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/groups/:groupId/edit",
    component: AddEditGroup,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/inventory",
    component: Inventory,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/measure-units",
    exact: true,
    component: MeasureUnits,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/measure-units/add",
    component: AddEditMeasureUnit,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/measure-units/:measureUnitId/edit",
    component: AddEditMeasureUnit,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/operations",
    exact: true,
    component: Operations,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/operations/add",
    component: AddEditOperation,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/operations/:operationId/edit",
    component: AddEditOperation,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/products",
    exact: true,
    component: Products,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/products/add",
    component: AddEditProduct,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/products/:productId/add-to-cart",
    component: AddToCart,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_CUSTOMER],
  },
  {
    path: "/products/:productId/edit",
    component: AddEditProduct,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    conditions: [USER_NULL],
  },
  {
    path: "/search",
    component: Search,
    conditions: [USER_NOT_NULL, USER_HAS_DATA],
  },
  {
    path: "/sign-in",
    component: SignIn,
    conditions: [USER_NULL],
  },
  {
    path: "/sign-up",
    component: SignUp,
    conditions: [USER_NULL],
  },
  {
    path: "/stores",
    exact: true,
    component: Stores,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/stores/add",
    component: AddEditStore,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/stores/:storeId/edit",
    component: AddEditStore,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/stores/:storeId/products",
    exact: true,
    component: StoreProducts,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/stores/:storeId/products/add",
    component: AddStoreProduct,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
    conditions: [USER_NOT_NULL, USER_HAS_DATA],
  },
  {
    path: "/profile/add",
    component: AddEditProfile,
    conditions: [USER_NOT_NULL, USER_DATA_UNDEFINED],
  },
  {
    path: "/profile/edit",
    component: AddEditProfile,
    conditions: [USER_NOT_NULL, USER_HAS_DATA],
  },
  {
    path: "/reports/total-profit",
    component: TotalProfit,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
  {
    path: "/reports/most-searched-products",
    component: MostSearchedProducts,
    conditions: [USER_NOT_NULL, USER_HAS_DATA, USER_TYPE_RETAILER],
  },
];

export default routes;
