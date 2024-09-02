import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import * as PRODUCT_REDUCERS from "./reducers/productReducers";
import * as CART_REDUCERS from "./reducers/cartReducer";
import * as USER_REDUCERS from "./reducers/userReducer";
import * as ORDER_REDUCERS from "./reducers/orderReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  productList: PRODUCT_REDUCERS.productListReducer,
  productDetails: PRODUCT_REDUCERS.productDetailsReducer,
  cart: CART_REDUCERS.cartReducer,
  userSignIn: USER_REDUCERS.userSignInReducer,
  userRegister: USER_REDUCERS.userRegisterReducer,
  orderCreate: ORDER_REDUCERS.orderCreateReducer,
  orderDetails: ORDER_REDUCERS.orderDetailsReducer,
  orderPay: ORDER_REDUCERS.orderPayReducer,
  orderMineList: ORDER_REDUCERS.orderMineListReducer,
  userDetails: USER_REDUCERS.userDetailsReducer,
  userUpdateProfile: USER_REDUCERS.userUpdateProfileReducer,
  productCreate: PRODUCT_REDUCERS.productCreateReducer,
  productUpdate: PRODUCT_REDUCERS.productUpdateReducer,
  orderList: ORDER_REDUCERS.orderListReducer,
  productDelete: PRODUCT_REDUCERS.productDeleteReducer,
  orderDelete: ORDER_REDUCERS.orderDeleteReducer,
  orderDeliver: ORDER_REDUCERS.orderDeliverReducer,
  userList: USER_REDUCERS.userListReducer,
  userDelete: USER_REDUCERS.userDeleteReducer,
  userUpdate: USER_REDUCERS.userUpdateReducer,
  productReviewCreate: PRODUCT_REDUCERS.productReviewCreateReducer,
  orderSummary: ORDER_REDUCERS.orderSummaryReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
