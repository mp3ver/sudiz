import {SET_MY_SUPPLIES_ACTION, SET_SUPPLIES_ACTION} from "../actions/supplies";

const defaultState = {
    supplies:[],
    mySupplies:[]
}

export const suppliesReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_SUPPLIES_ACTION:
            return {
                ...state,
                supplies: action.payload
            }
        case SET_MY_SUPPLIES_ACTION:
            return {
                ...state,
                mySupplies: action.payload
            }
        default:
            return state;
    }
}