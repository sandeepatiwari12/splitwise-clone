import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILED,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_FAILED,
  ADD_FRIEND_SUCCESS,
  SPLITWISE_FRIENDS,
} from "../actions/types";

const initialState = {
  loading: false,
  list: [],
};

/*
{ name: "Sandeep Tiwari", phone: "7718881681" },
    { name: "Sandeepa Tiwari", phone: "7718881686" },
    { name: "Sandip Tiwari", phone: "7718881687" },
    { name: "ABC", phone: "7718881682" },
    { name: "AABC", phone: "7718881688" },
    { name: "XYZ", phone: "7718881683" },
    { name: "XXYZ", phone: "7718881689" },
    { name: "MNO", phone: "7718881684" },
    { name: "WXY", phone: "7718881685" },
*/


const friendActions = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case GET_FRIENDS_REQUEST:
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: null,
        list: [...state.list, ...payload],
      };
    case GET_FRIENDS_FAILED:
    case ADD_FRIEND_FAILED:
      return {
        ...state,
        message,
        loading: false,
      };
    case ADD_FRIEND_SUCCESS:
      const friendsList = [...new Set([...state.list, payload])];
      localStorage.setItem(SPLITWISE_FRIENDS, JSON.stringify(friendsList));
      return {
        ...state,
        loading: false,
        message: 'Friend Added Successfully',
        list: friendsList,
      };
    default:
      return state;
  }
};
export default friendActions;
