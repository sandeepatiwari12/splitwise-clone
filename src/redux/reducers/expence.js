import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
};

const expenceReducer = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case ADD_EXPENCES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Expence Added Successfully",
        list: [...state.list, payload],
      };
    case ADD_EXPENCES_FAILED:
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
