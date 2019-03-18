import { REGISTER } from '../ActionTypes';

const INITIAL_STATE = [];

const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER.SAVE_LOCAL_DATA:
            return action.payload;
        case REGISTER.DELETE_LOCAL_DATA:
            return [];
        case REGISTER.GET_LOCAL_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default registerReducer;
