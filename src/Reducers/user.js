import { USER } from '../ActionTypes/index';

const INITIAL_STATE = null;

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER.LOAD_USER:
            return action.payload;
        case USER.UNLOAD_USER:
            return null;
        default:
            return state;
    }
};

export default userReducer;
