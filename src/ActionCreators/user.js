import { USER } from '../ActionTypes';

const signIn = values => ({
    type: USER.SIGNIN,
    payload: values
});

const singUp = values => ({
    type: USER.SIGNUP,
    payload: values
});

const signOut = () => ({
    type: USER.SIGNOUT
});

const loadUser = values => ({
    type: USER.LOAD_USER,
    payload: values
});

const unloadUser = () => ({
    type: USER.UNLOAD_USER
});

const successRegister = () => ({
    type: USER.SUCCESS_REGISTER
})

const cleanSuccessRegister = () => ({
    type: USER.CLEAN_SUCCESS_REGISTER
})

export const user = {
    signIn,
    signOut,
    singUp,
    loadUser,
    unloadUser,
    successRegister,
    cleanSuccessRegister,
};
