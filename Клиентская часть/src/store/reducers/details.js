import{SET_DETAILS_ACTION} from "../actions/details";

const defaultState = {
    details:[]
}

export const detailsReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_DETAILS_ACTION:
            return {
                ...state,
                details: action.payload
            }
        default:
            return state;
    }
}