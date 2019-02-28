import { State as AppState } from "./index";
import { Action } from "../actions";
import { User } from "../models/User";

export interface State {
    userIdentityMap: {
        [userId: number]: User;
    };
}

const initialState: State = {
    userIdentityMap: {}
};

export default function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case "FetchUser":
            return {
                ...state,
                userIdentityMap: {
                    ...state.userIdentityMap,
                    [action.payload.user.id]: action.payload.user
                }
            };
    }
    return state;
}

export function getUser(userId: number, state: AppState): User | null {
    const {
        user: { userIdentityMap }
    } = state;
    if (userIdentityMap.hasOwnProperty(userId)) {
        return userIdentityMap[userId];
    }
    return null;
}
