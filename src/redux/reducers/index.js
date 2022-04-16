import { combineReducers } from "redux";
import friends from "./friend";
import user from "./user";
import expences from './expence';
export default combineReducers({
  friends,
  user,
  expences
});
