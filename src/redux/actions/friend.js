import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILED,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILED,
  SPLITWISE_FRIENDS,
} from "./types";
// Load User
export const getFriendsList = () => async (dispatch) => {
  dispatch({
    type: GET_FRIENDS_REQUEST,
  });
  try {
    const friends = JSON.parse(localStorage.getItem(SPLITWISE_FRIENDS));
    dispatch({
      type: GET_FRIENDS_SUCCESS,
      payload: friends,
    });
  } catch (err) {
    dispatch({
      type: GET_FRIENDS_FAILED,
    });
  }
};

export const addFriend = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_FRIEND_REQUEST,
  });
  try {
    const friends = JSON.parse(localStorage.getItem(SPLITWISE_FRIENDS));
    let friendExist = friends.find(({ name }) => name === payload.name);
    if (!friendExist) {
      dispatch({
        type: ADD_FRIEND_SUCCESS,
        payload,
      });
      dispatch(getFriendsList)
    }
    else
      dispatch({
        type: ADD_FRIEND_FAILED,
        message: 'The User Already exist'
      });
  } catch (err) {
    dispatch({
      type: ADD_FRIEND_FAILED,
    });
  }
};
