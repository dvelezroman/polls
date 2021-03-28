import { call, put, select } from 'redux-saga/effects';
import { firebaseDataBase } from '../Store/Services/Firebase';
import { error, register } from '../ActionCreators';
import { Toast } from 'native-base';

import { tosagua } from '../Components/Auths/Mock';

const data = tosagua;

const _upload = async (registers) => {
    try {
        // registers = JSON.stringify(registers);
        // const blob = new Blob([registers], { type: 'text/plain' });
        // const ref = firebaseStorage.ref(
        //     `/actas/${data.key}/${userName}/registros`
        // );
        const regex = /./g;
        registers.forEach(reg => {
            const recinto = reg.recinto.split(' ').join('_');
            console.log({ verga: reg.recinto, recinto });
            firebaseDataBase.ref(`actas/Tosagua/${reg.parroquia}/${recinto}/${reg.mesa}/${reg.sexo}`).set(reg);
        })
        
        // const response = await ref.put(blob);
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
