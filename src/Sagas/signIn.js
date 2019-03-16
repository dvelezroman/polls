import { call, put } from 'redux-saga/effects';
import { authentication, firebaseDataBase } from '../Store/Services/Firebase';
import { user, error } from '../ActionCreators';

const signInFirebase = data =>
    authentication
        .signInWithEmailAndPassword(data.email, data.password)
        .then(result => ({
            error: false,
            data: result,
            msg: 'Inició sesión'
        }))
        .catch(error => ({
            error: true,
            data: error,
            msg: 'Error al iniciar sesión'
        }));

const getUser = uid =>
    firebaseDataBase
        .ref(`/users/${uid}`)
        .once('value')
        .then(snapshot => snapshot.val());

export function* workerSignIn(values) {
    try {
        const response = yield call(signInFirebase, values.payload);
        if (!response.error) {
            yield put(error.clearError());
            const { uid } = response.data.user;
            const dataUser = yield call(getUser, uid);
            yield put(user.loadUser(dataUser));
        } else {
            yield put(error.setError(response));
        }
    } catch (err) {
        yield put(
            error.setError({
                error: true,
                data: err,
                msg: 'Error en el servicio...'
            })
        );
    }
}

const signOut = () =>
    authentication
        .signOut()
        .then(data => ({ error: false, data, msg: 'Sesión finalizada' }))
        .catch(error => ({
            error: true,
            data: error,
            msg: 'No se pudo cerrar la sesión'
        }));

export function* workerSignOut() {
    try {
        const response = yield call(signOut);
        if (!response.error) {
            yield put(error.clearError());
            yield put(user.unloadUser());
        } else {
            yield put(error.setError(response));
        }
    } catch (err) {
        yield put(
            error.setError({
                error: true,
                data: err,
                msg: 'Hubo un error en el servicio...'
            })
        );
    }
}
