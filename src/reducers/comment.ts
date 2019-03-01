import { State as AppState } from "./index";
import { Action } from "../actions";
import { Comment } from "../models/Comment";

export interface State {
    commentsIdentityMap: {
        [postId: number]: Comment[];
    };
}

const initialState: State = {
    commentsIdentityMap: {}
};

export default function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case "FetchComments":
            return {
                ...state,
                commentsIdentityMap: {
                    ...state.commentsIdentityMap,
                    [action.payload.postId]: action.payload.comments
                }
            };
    }
    return state;
}

export function getComments(postId: number, state: AppState): Comment[] | null {
    const {
        comment: { commentsIdentityMap }
    } = state;
    if (commentsIdentityMap.hasOwnProperty(postId)) {
        return commentsIdentityMap[postId];
    }
    return null;
}
