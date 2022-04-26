import { combineReducers } from "redux";
import friends from "./friend";
import user from "./user";
import expences from './expence';
import expenceSummary from './expenceSummary';
import theme from './theme';
export default combineReducers({
  friends,
  user,
  expences,
  expenceSummary,
  theme
});
