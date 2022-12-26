import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middlewares/logger';

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([loggerMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
