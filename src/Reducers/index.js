import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from '../Reducers/user';
import errorReducer from '../Reducers/error';
import registerReducer from '../Reducers/register';
import loadingReducer from '../Reducers/loading';
import userRegisterReducer from '../Reducers/userRegister';

const reducers = combineReducers({
    userReducer,
    errorReducer,
    registerReducer,
    loadingReducer,
    userRegisterReducer,
    form
});

export default reducers;
