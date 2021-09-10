import { configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from 'connected-next-router';
import authReducer from 'features/auth/authSlice';
import lobbyReducer from 'features/lobby/lobbySlice';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AppContext } from 'next/app';
import Router from 'next/router';
import { Action, AnyAction, combineReducers, Reducer } from 'redux';

const routerMiddleware = createRouterMiddleware();

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  auth: authReducer,
  router: routerReducer,
});

const reducer: Reducer<AppState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (typeof window !== 'undefined' && state?.router) {
      nextState.router = state.router;
    }
    return nextState;
  }
  return rootReducer(state, action);
};

const makeStore: MakeStore<any> = (context): EnhancedStore => {
  const { asPath } = (context as AppContext).ctx || Router.router || {};
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware),
    preloadedState: {
      router: initialRouterState(asPath),
    },
  });
};

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
