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

export const user = {
    signIn,
    signOut,
    singUp,
    loadUser,
    unloadUser
};
