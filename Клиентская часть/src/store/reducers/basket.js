import{SET_BASKET_ACTION} from "../actions/basket";

const defaultState = {
    basket: {}
}

export const basketReducer = (state = defaultState, action) =>{
    switch (action.type){
        case SET_BASKET_ACTION:
            return {
                ...state,
                basket: action.payload
            }
        default:
            return state;
    }
}