import { createStore } from "redux";
import {reducer} from './RootReducer';

const store = createStore(reducer);
export default store;