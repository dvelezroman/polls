import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from '../Reducers/user';
import errorReducer from '../Reducers/error';
import registerReducer from '../Reducers/register';
import loadingReducer from '../Reducers/loading';

const reducers = combineReducers({
    userReducer,
    errorReducer,
    registerReducer,
    loadingReducer,
    form
});

export default reducers;
