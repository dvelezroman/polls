import { call, select } from 'redux-saga/effects';
import { firebaseDataBase } from '../Store/Services/Firebase';
import { Toast } from 'native-base';

import { tosagua } from '../Components/Auths/Mock';

const data = tosagua;

const _upload = async (registers) => {
    try {
        const regProms = registers.map(reg => {
            const recinto = reg.recinto.split(' ').join('_');
            return firebaseDataBase.ref(`actas/Tosagua/${reg.parroquia}/${recinto}/${reg.mesa}/${reg.sexo}`).set(reg);
        })
        await Promise.all(regProms);
        
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
        console.log(err)
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
        const response = yield call(_upload, registers);
        if (!response.error) {
            //yield put(register._clearStorage());
        }
    } catch (err) {
        console.log(err);
    }
}
