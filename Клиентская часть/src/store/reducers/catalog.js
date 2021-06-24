import{SET_CATALOG_ACTION} from "../actions/catalog";

const defaultState = {
    catalog:[]
}

export const catalogReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_CATALOG_ACTION:
            return {
                ...state,
                catalog: action.payload
            }
        default:
            return state;
    }
}