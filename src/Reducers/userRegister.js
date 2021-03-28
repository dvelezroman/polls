import { USER } from '../ActionTypes/index';

const INITIAL_STATE = null;

const userRegisterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER.SUCCESS_REGISTER:
          return true
        case USER.CLEAN_SUCCESS_REGISTER:
          return null
        default:
            return state;
    }
};

export default userRegisterReducer;