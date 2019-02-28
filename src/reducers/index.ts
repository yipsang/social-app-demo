import { combineReducers } from "redux";
import counter, { State as CounterState } from "./counter";
import user, { State as UserState } from "./user";

export interface State {
    counter: CounterState;
    user: UserState;
}

export default combineReducers<State>({
    counter,
    user
});
