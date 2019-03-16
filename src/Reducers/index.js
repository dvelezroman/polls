import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from '../Reducers/user';
import errorReducer from '../Reducers/error';

const reducers = combineReducers({
    userReducer,
    errorReducer,
    form
});

export default reducers;
