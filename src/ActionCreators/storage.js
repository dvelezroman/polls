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

const loadDataToReducer = (values) => ({
    type: STORAGE.LOAD_DATA_TO_REDUCER,
    payload: values,
})

const removeFromStorage = (values) => ({
    type: STORAGE.REMOVE_FROM_STORAGE,
    payload: values,
})

export const storage = {
    saveToStorage,
    getFromStorage,
    clearStorage,
    loadDataToReducer,
    removeFromStorage,
};
