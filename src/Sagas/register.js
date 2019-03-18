import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { register, error } from '../ActionCreators';

const _saveData = async registers => {
    try {
        await AsyncStorage.setItem('registers@poll', JSON.stringify(registers));
        return {
            error: false,
            msg: `Se guardó el registro`
        };
    } catch (err) {
        return {
            error: true,
            msg: 'No se pudo guardar el registro!'
        };
    }
};

const _fetchData = async () => {
    try {
        let registers = await AsyncStorage.getItem('registers@poll');
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
        await AsyncStorage.removeItem('registers@poll');
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
        const registers = yield select(getRegisters);
        registers.push(values.payload);
        yield call(_saveData, registers);
        yield put(register.saveDataToLocalStorage(registers));
    } catch (err) {
        console.log(err);
    }
}

export function* workerGetFromStorage() {
    try {
        const registers = yield call(_fetchData);
        yield call(register.saveDataToLocalStorage(registers));
    } catch (err) {
        console.log(err);
    }
}

export function* workerClearStorage() {
    try {
        yield call(_clearStorage);
        yield put(register.deleteDataFromStorage());
    } catch (err) {
        console.log(err);
    }
}
