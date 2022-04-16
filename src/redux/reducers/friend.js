import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILED,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_FAILED,
  ADD_FRIEND_SUCCESS,
  SPLITWISE_FRIENDS,
} from "../actions/types";
import _ from "lodash";

const initialState = {
  loading: false,
  list: [],
};

const friendReducer = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case GET_FRIENDS_REQUEST:
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIENDS_SUCCESS:
      const friends = _.uniqBy([...state.list, ...payload], "name");
      localStorage.setItem(SPLITWISE_FRIENDS, JSON.stringify(friends));
      return {
        ...state,
        loading: false,
        message: null,
        list: friends,
      };
    case GET_FRIENDS_FAILED:
    case ADD_FRIEND_FAILED:
      return {
        ...state,
        message,
        loading: false,
      };
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Friend Added Successfully",
        list: _.uniqBy([...state.list, payload], "name"),
      };
    default:
      return state;
  }
};
export default friendReducer;
