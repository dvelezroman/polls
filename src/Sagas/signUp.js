import { call, put } from 'redux-saga/effects';
import { authentication, firebaseDataBase } from '../Store/Services/Firebase';
import { error, loading } from '../ActionCreators';

const registerInFirebase = data =>
    authentication
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(data => ({
            error: false,
            data: data.user
        }))
        .catch(error => ({
            error: true,
            msg: 'Hubo un error, y no se registró el usuario.',
            data: error
        }));

const registerInDataBase = ({ uid, username, email }) =>
    firebaseDataBase.ref(`users/${uid}`).set({ username, email });

export function* workerSignUp(values) {
    try {
        yield put(loading.working());
        const registry = yield call(registerInFirebase, values.payload); // register the new user in firebase auth
        if (!registry.error) {
            const {
                payload: { name }
            } = values;
            const { email, uid } = registry.data;
            yield call(registerInDataBase, {
                username: name,
                email,
                uid
            }); // stores the data of new user in firebase database
            yield put(error.clearError());
        } else {
            yield put(error.setError(registry));
        }
        yield put(loading.rest());
    } catch (err) {
        yield put(
            error.setError({
                error: true,
                msg: 'Hubo un error con el servicio...',
                data: err
            })
        );
    }
}