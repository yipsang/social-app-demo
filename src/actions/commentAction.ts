import { ThunkAction } from "../store";
import { getComments } from "../reducers/comment";
import { Comment } from "../models/Comment";

export interface FetchCommentsAction {
    type: "FetchComments";
    payload: {
        postId: number;
        comments: Comment[];
    };
}

export function fetchComments(postId: number): ThunkAction<Promise<Comment[]>> {
    return async (dispatch, getState, { apiClient }) => {
        const optionalComments = getComments(postId, getState());
        if (optionalComments) {
            return optionalComments;
        }
        const comments = await apiClient.fetchComments(postId);
        dispatch({
            type: "FetchComments",
            payload: { postId, comments }
        });
        return comments;
    };
}
