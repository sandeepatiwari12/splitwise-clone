import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
  SPLITWISE_EXPENCES,
  SPLITWISE_FRIENDS,
} from "./types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const countDifference = (obj, KEY1, KEY2, key, amount) => {
  const difference = obj[KEY1][key] - amount;
  if (difference > 0) obj[KEY2][key] = difference;
  else {
    delete obj[KEY1][key];
    delete obj[KEY2][key];
  }
};

const updateFriends = (expenceObj) => {
  const transactions = expenceObj.splits.map((split) => {
    return {
      paidBy: expenceObj.paidBy,
      paidFor: split.id,
      amount: split.balance,
      id: uuidv4(),
    };
  });

  let transactionsLocal = JSON.parse(localStorage.getItem("transactions"));
  if (transactionsLocal) {
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactionsLocal, ...transactions])
    );
  } else {
    localStorage.setItem("transactions", JSON.stringify([...transactions]));
  }
  let storedTransactions = JSON.parse(localStorage.getItem("transactions"));

  let trackUsers = {
    youOwe: [],
    youOwed: [],
  };

  let expenseData = {
    youOwe: {},
    youOwed: {},
  };

  storedTransactions.forEach((trans) => {
    if (
      trans.paidBy === expenceObj.createdBy.id &&
      trans.paidFor === expenceObj.createdBy.id
    )
      return;

    if (trans.paidBy === expenceObj.createdBy.id) {
      if (trackUsers.youOwed.indexOf(trans.paidFor) === -1) {
        if (expenseData.youOwe[trans.paidFor]) {
          countDifference(
            expenseData,
            "youOwe",
            "youOwed",
            trans.paidFor,
            trans.amount
          );
        } else {
          expenseData.youOwed[trans.paidFor] = trans.amount;
          trackUsers.youOwed.push(trans.paidFor);
        }
      } else {
        if (expenseData.youOwe[trans.paidFor]) {
          countDifference(
            expenseData,
            "youOwe",
            "youOwed",
            trans.paidFor,
            trans.amount
          );
        } else {
          expenseData.youOwed[trans.paidFor] += trans.amount;
        }
      }
    }
    if (trans.paidFor === expenceObj.createdBy.id) {
      if (trackUsers.youOwe.indexOf(trans.paidBy) === -1) {
        if (expenseData.youOwed[trans.paidBy]) {
          countDifference(
            expenseData,
            "youOwed",
            "youOwe",
            trans.paidBy,
            trans.amount
          );
        } else {
          expenseData.youOwe[trans.paidBy] = trans.amount;
          trackUsers.youOwe.push(trans.paidBy);
        }
      } else {
        if (expenseData.youOwed[trans.paidBy]) {
          countDifference(
            expenseData,
            "youOwed",
            "youOwe",
            trans.paidBy,
            trans.amount
          );
        } else {
          expenseData.youOwe[trans.paidBy] += trans.amount;
        }
      }
    }
  });

  console.log("expenseData", expenseData);
  console.log("trackUsers", trackUsers);
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
      dispatch(updateFriends(payload));
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
