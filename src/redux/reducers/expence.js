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

export default function (state = initialState, action) {
  const { type, payload, message } = action;
  switch (type) {
    case ADD_EXPENCES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPENCES_SUCCESS:
      const expenses = _.uniqBy([...state.list, payload], "id");
      localStorage.setItem(SPLITWISE_EXPENCES, JSON.stringify(expenses));
      return {
        ...state,
        loading: false,
        message: "Expence Added Successfully",
        list: expenses,
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
}
