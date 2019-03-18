import { LOADING } from '../ActionTypes';

INITIAL_STATE = false;

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING.WORK:
            return true;
        case LOADING.REST:
            return false;
        default:
            return state;
    }
};

export default loadingReducer;
