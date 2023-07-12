import React from 'react'
import { combineReducers } from 'redux'
import { taskReducer } from './taskReducer';

import {sessionReducer} from "redux-react-session"
import { employeeReducer, userReducer } from './userReducer';
import { feedbackReducer } from './feedbackReducer';
import { moodReducer } from './moodReducer';

const rootReducer = combineReducers({
    //session: sessionReducer,
    user: userReducer,
    tasks: taskReducer,
    employees: employeeReducer,
    feedbacks: feedbackReducer,
    moodEntry: moodReducer
});

export default rootReducer;