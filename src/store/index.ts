import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset';

import rootReducer from 'reducers';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const enhancedCreateStore = compose(applyMiddleware(createLogger(), thunk), reduxReset())(createStore);

// const store = createStore(persistedReducer, applyMiddleware(createLogger(), thunk), reduxReset());
const store = enhancedCreateStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
