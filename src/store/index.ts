import {
    createStore,
    applyMiddleware,
    Store as ReduxStore,
    Dispatch as ReduxDispatch
} from "redux";
import thunk, {
    ThunkAction as _ThunkAction,
    ThunkDispatch as _ThunkDispatch
} from "redux-thunk";
import reducers, { State } from "../reducers";
import { Action } from "../actions";
import { APIClient } from "../apiClient";

interface ThunkExtraArgument {
    apiClient: APIClient;
}

export type ThunkAction<R> = _ThunkAction<R, State, ThunkExtraArgument, Action>;
type ThunkDispatch = _ThunkDispatch<State, ThunkExtraArgument, Action>;
export type Dispatch = ReduxDispatch & ThunkDispatch;

interface Store<S> extends ReduxStore<S> {
    dispatch: Dispatch;
}

export function makeStore(apiClient: APIClient): Store<State> {
    const middlewares = [thunk.withExtraArgument({ apiClient })];
    return createStore(reducers, applyMiddleware(...middlewares));
}
