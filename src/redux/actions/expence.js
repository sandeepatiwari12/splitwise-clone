import {
  ADD_EXPENCES_REQUEST,
  ADD_EXPENCES_SUCCESS,
  ADD_EXPENCES_FAILED,
  GET_EXPENCES_REQUEST,
  GET_EXPENCES_SUCCESS,
  GET_EXPENCES_FAILED,
  SPLITWISE_EXPENCES,
  SPLITWISE_EXPENCE_DATA,
  SPLITWISE_TRACK_USERS,
} from "./types";
import { v4 as uuidv4 } from "uuid";

const countDifferences = (obj, KEY1, KEY2, key, amount) => {
  const difference =
    obj[KEY1][key] > amount ? obj[KEY1][key] - amount : amount - obj[KEY1][key];

  if (difference > 0) {
    if (obj[KEY1][key] > amount) {
      obj[KEY1][key] = difference;
      delete obj[KEY2][key];
    } else {
      obj[KEY2][key] = difference;
      delete obj[KEY1][key];
    }
  } else {
    delete obj[KEY1][key];
  }
};

const updateFriends = (expenceObj) => {
  const transactions = expenceObj.splits.map((split) => {
    return {
      ...expenceObj,
      paidBy: expenceObj.paidBy,
      paidFor: split.id,
      amount: split.balance,
      id: uuidv4(),
    };
  });

  let transactionsLocal = JSON.parse(localStorage.getItem(SPLITWISE_EXPENCES));
  if (transactionsLocal) {
    localStorage.setItem(
      SPLITWISE_EXPENCES,
      JSON.stringify([...transactionsLocal, ...transactions])
    );
  } else {
    localStorage.setItem(SPLITWISE_EXPENCES, JSON.stringify(transactions));
  }
  let storedTransactions = JSON.parse(localStorage.getItem(SPLITWISE_EXPENCES));

  let trackUsers = {
    youOwe: [],
    youOwed: [],
  };
  let expenseData = {
    youOwe: {},
    youOwed: {},
  };

  storedTransactions.forEach((trans) => {
    let { paidBy, paidFor, amount } = trans;
    if (
      paidBy === expenceObj.createdBy.id &&
      paidFor === expenceObj.createdBy.id
    )
      return;

    if (paidBy === expenceObj.createdBy.id) {
      if (trackUsers.youOwed.indexOf(paidFor) === -1) {
        if (expenseData.youOwe[paidFor]) {
          countDifferences(expenseData, "youOwe", "youOwed", paidFor, amount);
        } else {
          expenseData.youOwed[paidFor] = amount;
          trackUsers.youOwed.push(paidFor);
        }
      } else {
        if (expenseData.youOwe[paidFor]) {
          countDifferences(expenseData, "youOwe", "youOwed", paidFor, amount);
        } else {
          expenseData.youOwed[paidFor] += amount;
        }
      }
    }
    if (paidFor === expenceObj.createdBy.id) {
      if (trackUsers.youOwe.indexOf(paidBy) === -1) {
        if (expenseData.youOwed[paidBy]) {
          countDifferences(expenseData, "youOwed", "youOwe", paidBy, amount);
        } else {
          expenseData.youOwe[paidBy] = amount;
          trackUsers.youOwe.push(paidBy);
        }
      } else {
        if (expenseData.youOwed[paidBy]) {
          countDifferences(expenseData, "youOwed", "youOwe", paidBy, amount);
        } else {
          expenseData.youOwe[paidBy] += amount;
        }
      }
    }
  });
  localStorage.setItem(SPLITWISE_EXPENCE_DATA, JSON.stringify(expenseData));
  localStorage.setItem(SPLITWISE_TRACK_USERS, JSON.stringify(trackUsers));
};

export const addExpences = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EXPENCES_REQUEST,
  });
  try {
    payload.id = uuidv4();
    dispatch(updateFriends(payload));
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
