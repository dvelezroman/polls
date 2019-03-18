import { STORAGE } from '../ActionTypes';

const saveToStorage = values => ({
    type: STORAGE.SAVE_TO_STORAGE,
    payload: values
});

const getFromStorage = values => ({
    type: STORAGE.GET_FROM_STORAGE
});

const clearStorage = () => ({
    type: STORAGE.CLEAR_STORAGE
});

export const storage = {
    saveToStorage,
    getFromStorage,
    clearStorage
};
