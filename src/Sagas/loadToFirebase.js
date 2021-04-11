import { call, select, put } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid'
import { firebaseDataBase, firebaseStorage } from '../Store/Services/Firebase';
import { Toast } from 'native-base';
import { _storeData } from './signIn';
import { user, register, loading } from '../ActionCreators';

const _getRegistersFromFirebase = async () => {
    try {
        const registers = firebaseDataBase.ref('actas/Tosagua');
        registers.on('value', (snapshot) => {
            const data = snapshot.val();
            return {
                error: false,
                data,
                msg: `Se recuperaron los datos...`
            };
        });
    } catch (err) {
        console.log(err)
        Toast.show({
            text: 'No se pudo obtener los datos!',
            textStyle: { height: 50 },
            type: 'danger',
            duration: 2000
        });
        return {
            error: true,
            msg: `No se pudo obtener los datos...`
        };
    }
}

const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }

const _upload = async (registers) => {
    let userUpdated = null;
    try {
        const regProms = registers.map(reg => {
            const recinto = reg.recinto.split(' ').join('_');
            const keyRef = uuidv4()
            const imagePath = `actas/Tosagua/${reg.parroquia}/${recinto}/${reg.mesa}/${reg.sexo}/${keyRef}`;
            delete reg.file;
            return uriToBlob(reg.uploadUri)
                .then(blob => {
                    return firebaseStorage.ref(imagePath).put(blob, {
                        contentType: 'image/jpeg'
                    })
                })
                .then(snapshot => {
                    return firebaseStorage.ref(snapshot.ref.fullPath).getDownloadURL()
                })
                .then(url => {
                    reg.imageURL = url
                    delete reg.uploadUri
                    return firebaseDataBase.ref(`actas/Tosagua/${reg.parroquia}@${recinto}@${reg.mesa}@${reg.sexo}`).set(reg)
                })
                .then(() => {
                    const { nombre, email, admin, uid } = reg.responsable;
                    if (userUpdated) {
                        userUpdated = { username: nombre, email, admin, uploaded: true, uid };
                    }
                    _storeData({ username: nombre, email, admin, uploaded: true, uid })
                    return firebaseDataBase.ref(`users/${uid}`).set({ username: nombre, email, admin, uploaded: true });
                });
            
            // return firebaseStorage.ref(reg.imageURL).put(blobFile).then(() => {
            //     console.log("Image uploaded...");
            //     return firebaseDataBase.ref(`actas/Tosagua/${reg.parroquia}@${recinto}@${reg.mesa}@${reg.sexo}`).set(reg);
            // });
        })
        await Promise.all(regProms);
        // borra todos los registros
        Toast.show({
            text: 'Se subieron los registros...',
            textStyle: { height: 50 },
            type: 'success',
            duration: 2000
        });
        return {
            error: false,
            msg: 'Se subieron los registros...',
            userUpdated,
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

export function* workerUploadToFirebase() {
    try {
        yield put(loading.working());
        const registers = yield select(getRegisters);
        const response = yield call(_upload, registers);
        if (!response.error) {
            yield put(user.updateUserUloadedStatus(true));
            yield put(register.deleteDataFromStorage());
        }
        yield put(loading.rest());
    } catch (err) {
        console.log(err);
        yield put(loading.rest());
    }
}

export function* workerGetFromFirebase() {
    try {
        const response = yield call(_getRegistersFromFirebase);
        if (!response.error) {
            console.log(response.data);
            //yield put(register._clearStorage());
        }
    } catch (err) {
        console.log(err);
    }
}
