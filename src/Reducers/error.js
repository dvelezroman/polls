import { ERROR } from '../ActionTypes';

const INITIAL_STATE = {
    error: false,
    msg: '',
    data: null
};

const errorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ERROR.SET_ERROR:
            return action.payload;
        case ERROR.CLEAR_ERROR:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default errorReducer;
