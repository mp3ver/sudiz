import{SET_ROLE_ACTION} from "../actions/auth";

const defaultState = {
    role: ''
}

export const authReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_ROLE_ACTION:
            return {
                ...state,
                role: action.payload
            }
        default:
            return state;
    }
}