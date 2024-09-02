import * as TYPES from "../constants/userConstants";

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_SIGN_IN_REQUEST:
      return { loading: true };
    case TYPES.USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TYPES.USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_REGISTER_REQUEST:
      return { loading: true };
    case TYPES.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TYPES.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.USER_DETAILS_REQUEST:
      return { loading: true };
    case TYPES.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case TYPES.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case TYPES.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case TYPES.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.USER_LIST_REQUEST:
      return { loading: true };
    case TYPES.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case TYPES.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_DELETE_REQUEST:
      return { loading: true };
    case TYPES.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TYPES.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_UPDATE_REQUEST:
      return { loading: true };
    case TYPES.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TYPES.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
