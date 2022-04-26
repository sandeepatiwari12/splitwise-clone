import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
  GET_EXPENCES_REQUEST,
  GET_EXPENCES_SUCCESS,
  GET_EXPENCES_FAILED,
  SPLITWISE_EXPENCE_DATA,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const addExpences = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EXPENCES_REQUEST,
  });
  try {
    payload.id = uuidv4();
    dispatch({
      type: ADD_EXPENCES_SUCCESS,
      payload,
    });
  } catch (err) {
    dispatch({
      type: ADD_EXPENCES_FAILED,
    });
  }
};

export const getExpenceSummary = () => async (dispatch) => {
  dispatch({
    type: GET_EXPENCES_REQUEST,
  });
  try {
    const expenceData = JSON.parse(localStorage.getItem(SPLITWISE_EXPENCE_DATA));
    dispatch({
      type: GET_EXPENCES_SUCCESS,
      payload: expenceData
    });
  } catch (err) {
    dispatch({
      type: GET_EXPENCES_FAILED,
    });
  }
};
