import { call, put, select } from 'redux-saga/effects';
import { firebaseStorage } from '../Store/Services/Firebase';
import { error } from '../ActionCreators';
import { Toast } from 'native-base';

const _upload = async (registers, userName) => {
    try {
        const data = JSON.stringify(registers);
        const blob = new Blob([data], { type: 'text/plain' });
        const ref = firebaseStorage.ref(`/actas/${userName}/registros`);
        const response = await ref.put(blob);
        Toast.show({
            text: 'Se subieron los registros...',
            textStyle: { height: 50 },
            type: 'success',
            duration: 2000
        });
        return {
            error: false,
            msg: 'Se subieron los registros...'
        };
    } catch (err) {
        Toast.show({
            text: 'No se subieron los registros',
            textStyle: { height: 50 },
            type: 'danger',
            duration: 2000
        });
        return {
            error: true,
            msg: `No se logró subir los datos`
        };
    }
};

const getRegisters = state => state.registerReducer;
const getUserName = state => state.userReducer.username;

export function* workerUploadToFirebase() {
    try {
        const registers = yield select(getRegisters);
        const userName = yield select(getUserName);
        const response = yield call(_upload, registers, userName);
        if (!response.error) {
            //yield put(register._clearStorage());
        }
    } catch (err) {
        console.log(err);
    }
}
