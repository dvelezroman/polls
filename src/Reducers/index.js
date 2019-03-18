import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from '../Reducers/user';
import errorReducer from '../Reducers/error';
import registerReducer from '../Reducers/register';

const reducers = combineReducers({
    userReducer,
    errorReducer,
    registerReducer,
    form
});

export default reducers;
