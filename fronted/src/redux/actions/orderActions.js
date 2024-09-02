import Axios from "../../Api/Axios";
import { CART_EMPTY } from "../constants/cartConstants";
import * as TYPES from "../constants/orderConstants";
import * as ENDPOINT from "../../Api/services";
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await Axios.post(ENDPOINT.ORDERS_API, order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TYPES.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: TYPES.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPES.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: TYPES.ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: TYPES.ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TYPES.ORDER_PAY_FAIL, payload: message });
    }
  };

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_MINE_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TYPES.ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const listOrders =
  ({ seller = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: TYPES.ORDER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: TYPES.ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TYPES.ORDER_LIST_FAIL, payload: message });
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPES.ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.ORDER_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: TYPES.ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.ORDER_DELIVER_FAIL, payload: message });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.ORDER_SUMMARY_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPES.ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPES.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
