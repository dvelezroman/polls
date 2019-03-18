import { takeEvery } from 'redux-saga/effects';
import { USER, STORAGE } from '../ActionTypes';
import { workerSignIn, workerSignOut } from './signIn';
import { workerSignUp } from './signUp';
import {
    workerSaveToStorage,
    workerGetFromStorage,
    workerClearStorage
} from './register';

export default function* watcher() {
    // listen and catch events
    yield takeEvery(USER.SIGNIN, workerSignIn);
    yield takeEvery(USER.SIGNOUT, workerSignOut);
    yield takeEvery(USER.SIGNUP, workerSignUp);
    yield takeEvery(STORAGE.SAVE_TO_STORAGE, workerSaveToStorage);
    yield takeEvery(STORAGE.GET_FROM_STORAGE, workerGetFromStorage);
    yield takeEvery(STORAGE.CLEAR_STORAGE, workerClearStorage);
}

// TODO : una vez que se loggea , guardar localmente una sesion del usuario
