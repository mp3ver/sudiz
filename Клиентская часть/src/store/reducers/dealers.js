import{SET_DEALERS_ACTION} from "../actions/dealers";

const defaultState = {
    dealers:[]
}

export const dealersReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_DEALERS_ACTION:
            return {
                ...state,
                dealers: action.payload
            }
        default:
            return state;
    }
}