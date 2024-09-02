import Axios from "../../Api/Axios";
import * as ENDPOINT from "../../Api/services";
import * as TYPE from "../constants/userConstants";

export const sign_in = (email, password) => async (dispatch) => {
  dispatch({ type: TYPE.USER_SIGN_IN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(ENDPOINT.SIGN_IN, { email, password });
    dispatch({ type: TYPE.USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TYPE.USER_SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: TYPE.USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(ENDPOINT.REGISTER, {
      name,
      email,
      password,
    });
    dispatch({ type: TYPE.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: TYPE.USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TYPE.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const sign_out = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: TYPE.USER_SIGN_OUT });
  document.location.href = "/signin";
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(ENDPOINT.USER_UPDATE_PROFILE_API, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: TYPE.USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TYPE.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_DELETE_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_DELETE_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_UPDATE_FAIL, payload: message });
  }
};
