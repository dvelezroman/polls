import { LOADING } from '../ActionTypes';

const working = () => ({
    type: LOADING.WORK
});

const rest = () => ({
    type: LOADING.REST
});

export const loading = {
    working,
    rest
};
