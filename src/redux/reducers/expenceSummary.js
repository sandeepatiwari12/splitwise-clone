import {
  GET_EXPENCES_REQUEST,
  GET_EXPENCES_SUCCESS,
  GET_EXPENCES_FAILED,
} from "../actions/types";

const initialState = {
  loading: false,
  summary: {},
};

const expenceReducer = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case GET_EXPENCES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EXPENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Summary loaded Successfully",
        summary: payload,
      };
    case GET_EXPENCES_FAILED:
      return {
        ...state,
        message,
        loading: false,
      };
    default:
      return state;
  }
};

export default expenceReducer;
