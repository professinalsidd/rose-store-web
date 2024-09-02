import * as TYPES from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ORDER_CREATE_REQUEST:
      return { loading: true };
    case TYPES.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case TYPES.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case TYPES.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case TYPES.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ORDER_PAY_REQUEST:
      return { loading: true };
    case TYPES.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case TYPES.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case TYPES.ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case TYPES.ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case TYPES.ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case TYPES.ORDER_LIST_REQUEST:
      return { loading: true };
    case TYPES.ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case TYPES.ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ORDER_DELETE_REQUEST:
      return { loading: true };
    case TYPES.ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TYPES.ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ORDER_DELIVER_REQUEST:
      return { loading: true };
    case TYPES.ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case TYPES.ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case TYPES.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case TYPES.ORDER_SUMMARY_REQUEST:
      return { loading: true };
    case TYPES.ORDER_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case TYPES.ORDER_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
