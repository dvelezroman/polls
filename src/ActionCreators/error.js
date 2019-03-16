import { ERROR } from '../ActionTypes/index';

const setError = values => ({
    type: ERROR.SET_ERROR,
    payload: values
});

const clearError = () => ({
    type: ERROR.CLEAR_ERROR
});

export const error = {
    setError,
    clearError
};
