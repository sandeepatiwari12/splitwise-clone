import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED } from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  try {
    dispatch({
      type: GET_USER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAILED,
    });
  }
};
