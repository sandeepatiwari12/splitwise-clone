import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
  SPLITWISE_EXPENCES,
} from "../actions/types";
import _ from "lodash";

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
      let expences = JSON.parse(localStorage.getItem(SPLITWISE_EXPENCES));
      return {
        ...state,
        loading: false,
        message: "Expence Added Successfully",
        list: expences,
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
