import {
  SET_THEME_REQUEST,
  SET_THEME_SUCCESS,
  SET_THEME_FAILED,
  GET_THEME_REQUEST,
  GET_THEME_SUCCESS,
  GET_THEME_FAILED,
} from "./types";

// Update theme
export const setTheme = (payload) => async (dispatch) => {
  dispatch({
    type: SET_THEME_REQUEST,
  });
  try {
    dispatch({
      type: SET_THEME_SUCCESS,
      payload
    });
  } catch (err) {
    dispatch({
      type: SET_THEME_FAILED,
    });
  }
};

export const getTheme = () => async (dispatch) => {
  dispatch({
    type: GET_THEME_REQUEST,
  });
  try {
    dispatch({
      type: GET_THEME_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: GET_THEME_FAILED,
    });
  }
};
