import { REGISTER } from '../ActionTypes';

const saveDataToLocalStorage = values => ({
    type: REGISTER.SAVE_LOCAL_DATA,
    payload: values
});

const getDataFromStorage = () => ({
    type: REGISTER.GET_LOCAL_DATA
});

const deleteDataFromStorage = () => ({
    type: REGISTER.DELETE_LOCAL_DATA
});

export const register = {
    saveDataToLocalStorage,
    getDataFromStorage,
    deleteDataFromStorage
};
