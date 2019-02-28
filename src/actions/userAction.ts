import { ThunkAction } from "../store";
import { getUser } from "../reducers/user";
import { User } from "../models/User";

export interface FetchUserAction {
    type: "FetchUser";
    payload: {
        user: User;
    };
}

export function fetchUser(userId: number): ThunkAction<Promise<User>> {
    return async (dispatch, getState, { apiClient }) => {
        const optionalUser = getUser(userId, getState());
        if (optionalUser) {
            return optionalUser;
        }
        const user = await apiClient.fetchUser(userId);
        dispatch({
            type: "FetchUser",
            payload: { user }
        });
        return user;
    };
}
