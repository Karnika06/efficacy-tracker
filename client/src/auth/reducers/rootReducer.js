import React from 'react'
import { combineReducers } from 'redux'
import { taskReducer } from './taskReducer';

import {sessionReducer} from "redux-react-session"
import { employeeReducer, userReducer } from './userReducer';
import { feedbackReducer } from './feedbackReducer';

const rootReducer = combineReducers({
    //session: sessionReducer,
    user: userReducer,
    tasks: taskReducer,
    employees: employeeReducer,
    feedbacks: feedbackReducer
});

export default rootReducer;