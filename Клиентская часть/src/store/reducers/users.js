import{SET_USERS_ACTION} from "../actions/users";

const defaultState = {
    users:[]
}

export const usersReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_USERS_ACTION:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}