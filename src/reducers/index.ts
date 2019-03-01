import { combineReducers } from "redux";
import counter, { State as CounterState } from "./counter";
import user, { State as UserState } from "./user";
import comment, { State as CommentState } from "./comment";

export interface State {
    counter: CounterState;
    user: UserState;
    comment: CommentState;
}

export default combineReducers<State>({
    counter,
    user,
    comment
});
