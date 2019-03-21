import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import { register, error, loading } from '../ActionCreators';

import { tosagua } from '../Components/Auths/Mock';
const data = tosagua;

const _saveData = async registers => {
    try {
        await AsyncStorage.setItem(
            `${data.key}@registers@poll`,
            JSON.stringify(registers)
        );
        Toast.show({
            text: 'Se guardó el registro',
            textStyle: { height: 50 },
            type: 'success',
            duration: 2000
        });
        return {
            error: false,
            msg: `Se guardó el registro`
        };
    } catch (err) {
        Toast.show({
            text: 'No se pudo guardar el registro!',
            textStyle: { height: 50 },
            type: 'danger',
            duration: 2000
        });
        return {
            error: true,
            msg: 'No se pudo guardar el registro!'
        };
    }
};

const _fetchData = async () => {
    try {
        let registers = await AsyncStorage.getItem(
            `${data.key}@registers@poll`
        );
        registers = JSON.parse(registers);
        return {
            error: false,
            data: registers,
            msg: `Recuperó ${registers.length} registros`
        };
    } catch (err) {
        return {
            error: true,
            data: [],
            msg: `No pudo recuperar los regitros`
        };
    }
};

const _clearStorage = async () => {
    try {
        await AsyncStorage.removeItem(`${data.key}@registers@poll`);
        return {
            error: false,
            msg: 'Se limpió el Storage'
        };
    } catch (err) {
        return {
            error: true,
            msg: `No se logró limpiar el storage`
        };
    }
};

const getRegisters = state => state.registerReducer;

export function* workerSaveToStorage(values) {
    try {
        yield put(loading.working());
        const registers = yield select(getRegisters);
        registers.push(values.payload);
        const saveResponse = yield call(_saveData, registers);
        yield put(register.saveDataToLocalStorage(registers));
        yield put(loading.rest());
    } catch (err) {
        console.log(err);
    }
}

export function* workerGetFromStorage() {
    try {
        yield put(loading.working());
        const registers = yield call(_fetchData);
        yield put(register.saveDataToLocalStorage(registers.data));
        yield put(loading.rest());
    } catch (err) {
        console.log(err);
    }
}

export function* workerClearStorage() {
    try {
        yield put(loading.working());
        yield call(_clearStorage);
        yield put(register.deleteDataFromStorage());
        yield put(loading.rest());
    } catch (err) {
        console.log(err);
    }
}
