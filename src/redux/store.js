import reducer from "./reducer";
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancers = composeWithDevTools();

const store = createStore(reducer, composedEnhancers);
// async function handle?

export default store;