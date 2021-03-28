import { LOADING } from '../ActionTypes';

const working = () => ({
    type: LOADING.WORK
});

const rest = (callback) => {
    if (callback) {
        callback();
    }
    return {
        type: LOADING.REST
    };
}

export const loading = {
    working,
    rest
};
