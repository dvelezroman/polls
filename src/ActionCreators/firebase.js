import { FIREBASE } from '../ActionTypes';

const upload = () => ({ type: FIREBASE.UPLOAD });

const getFromFirebase = () => ({ type: FIREBASE.GET_FROM_FIREBASE })

export const firebase = {
    upload,
    getFromFirebase,
};
