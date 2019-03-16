import { takeEvery } from 'redux-saga/effects';
import { USER } from '../ActionTypes/index';
import { workerSignIn, workerSignOut } from './signIn';
import { workerSignUp } from './signUp';

export default function* watcher() {
    // listen and catch events
    yield takeEvery(USER.SIGNIN, workerSignIn);
    yield takeEvery(USER.SIGNOUT, workerSignOut);
    yield takeEvery(USER.SIGNUP, workerSignUp);
}

// TODO : una vez que se loggea , guardar localmente una sesion del usuario
