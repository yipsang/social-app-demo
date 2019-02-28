import {
    IncrementCountAction,
    DecrementCountAction,
    ChangeCountAction
} from "./counterAction";
import { FetchUserAction } from "./userAction";

export type Action =
    | IncrementCountAction
    | DecrementCountAction
    | ChangeCountAction
    | FetchUserAction;
