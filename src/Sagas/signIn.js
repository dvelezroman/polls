import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
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

const _storeData = async dataUser => {
    try {
        await AsyncStorage.setItem(
            'userLogged@polls',
            JSON.stringify(dataUser)
        );
    } catch (err) {
        console.log(err);
    }
};

export function* workerSignIn(values) {
    try {
        const response = yield call(signInFirebase, values.payload);
        if (!response.error) {
            yield put(error.clearError());
            const { uid } = response.data.user;
            const dataUser = yield call(getUser, uid);
            yield call(_storeData, dataUser);
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

const _removeData = async () => {
    try {
        await AsyncStorage.removeItem('userLogged@polls');
    } catch (err) {
        console.log(err);
    }
};

export function* workerSignOut() {
    try {
        const response = yield call(signOut);
        if (!response.error) {
            yield put(error.clearError());
            yield call(_removeData);
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
