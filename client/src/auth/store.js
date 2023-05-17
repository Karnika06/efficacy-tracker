// creating our redux store to make redux work

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import {sessionService} from 'redux-react-session'

const initialState = {};
const middlewares = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools
    (applyMiddleware(...middlewares)))

//sessionService.initSessionService(store);

export default store;