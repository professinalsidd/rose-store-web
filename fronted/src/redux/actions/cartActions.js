import Axios from "../../Api/Axios";
import * as TYPE from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  dispatch({
    type: TYPE.CART_ITEM_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
      type: TYPE.CART_ITEM_ADD,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: TYPE.CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: TYPE.CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: TYPE.CART_ITEM_REMOVE, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: TYPE.CART_SAVE_PAYMENT_METHOD, payload: data });
};
