import {
    IncrementCountAction,
    DecrementCountAction,
    ChangeCountAction
} from "./counterAction";
import { FetchUserAction } from "./userAction";
import { FetchCommentsAction } from "./commentAction";

export type Action =
    | IncrementCountAction
    | DecrementCountAction
    | ChangeCountAction
    | FetchUserAction
    | FetchCommentsAction;
