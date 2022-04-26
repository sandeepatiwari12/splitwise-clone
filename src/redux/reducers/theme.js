import {
  SET_THEME_REQUEST,
  SET_THEME_SUCCESS,
  SET_THEME_FAILED,
  GET_THEME_REQUEST,
  GET_THEME_SUCCESS,
  GET_THEME_FAILED,
  SPLITWISE_THEME,
} from "../actions/types";

const initialState = {
  loading: false,
  mode: "light",
};

const themeReducer = (state = initialState, action) => {
  const { type, message, payload } = action;
  const themeMode = localStorage.getItem(SPLITWISE_THEME);
  switch (type) {
    case SET_THEME_REQUEST:
    case GET_THEME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_THEME_SUCCESS:
      localStorage.setItem(SPLITWISE_THEME, payload);
      return {
        ...state,
        loading: false,
        message: null,
        mode: payload,
      };
    case SET_THEME_FAILED:
    case GET_THEME_FAILED:
      return {
        ...state,
        message,
        loading: false,
      };

    case GET_THEME_SUCCESS:
      return {
        ...state,
        message: null,
        loading: false,
        mode: themeMode
      };
    default:
      return state;
  }
};
export default themeReducer;
