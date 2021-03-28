import { createStore, compose, applyMiddleware } from 'redux';
import Reactotron from '../../ReactotronConfig';
import RootReducer from '../Reducers/index';
import Main from '../Sagas/index';
import createSagaMiddleware from 'redux-saga';

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(
    RootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(Main);

export default store;
