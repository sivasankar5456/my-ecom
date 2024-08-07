// step 5
import {legacy_createStore as createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'
import rootReducer from "./reducers/rootReducer";
import productsReducer from "./reducers/productsReducer";

const store = createStore(rootReducer,applyMiddleware(thunk))
export default store