import { REGISTER, STORAGE } from '../ActionTypes';

const INITIAL_STATE = [];

const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORAGE.LOAD_DATA_TO_REDUCER:
            return action.payload;
        case REGISTER.DELETE_LOCAL_DATA:
            return [];
        default:
            return state;
    }
};

export default registerReducer;
