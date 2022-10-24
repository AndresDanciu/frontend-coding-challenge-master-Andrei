import { configureStore, ConfigureStoreOptions, Store } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  initialState,
  middlewares,
  RootReducer,
  rootReducers,
} from './rootReducers';

const configureAppStore: ConfigureStoreOptions = {
  devTools:
    process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line unicorn/prefer-spread
    getDefaultMiddleware().concat(...middlewares),
  preloadedState: initialState,
  reducer: rootReducers,
};

const store = configureStore(configureAppStore) as Store<RootReducer>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
