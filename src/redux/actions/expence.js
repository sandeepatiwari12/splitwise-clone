import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
  SPLITWISE_EXPENCES,
  SPLITWISE_FRIENDS,
} from "./types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const updateFriends = (friends) => {
  const allFriends = JSON.parse(localStorage.getItem(SPLITWISE_FRIENDS));
  const finalFriends =   [...new Set([...allFriends, ...friends])]
  console.log("finalFriends", _.uniqBy(finalFriends, 'balance'));
  // localStorage.setItem(SPLITWISE_FRIENDS, JSON.stringify(finalFriends));
};

export const addExpences = (payload) => async (dispatch) => {
  const expences = JSON.parse(localStorage.getItem(SPLITWISE_EXPENCES));
  dispatch({
    type: ADD_EXPENCES_REQUEST,
  });
  try {
    let expenceExist = expences && expences.find(({ id }) => id === payload.id);
    if (!expenceExist) {
      payload.id = uuidv4();
      dispatch(updateFriends(payload.splits));
      dispatch({
        type: ADD_EXPENCES_SUCCESS,
        payload,
      });
    } else
      dispatch({
        type: ADD_EXPENCES_FAILED,
        message: "Expence already exists",
      });
  } catch (err) {
    dispatch({
      type: ADD_EXPENCES_FAILED,
    });
  }
};
