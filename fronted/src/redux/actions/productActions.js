import * as TYPES from "../constants/productConstants";
import * as EndPoint from "../../Api/services";
import Axios from "../../Api/Axios";

export const listProducts =
  ({ seller = "" }) =>
  async (dispatch) => {
    dispatch({
      type: TYPES.PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/products?seller=${seller}`);
      dispatch({ type: TYPES.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TYPES.PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: TYPES.PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: TYPES.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPES.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.PRODUCT_CREATE_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      EndPoint.ALL_PRODUCT_LIST,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: TYPES.PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: TYPES.PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPES.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPES.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPES.PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: TYPES.PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: TYPES.PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TYPES.PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };
