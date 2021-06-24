export const GET_DEALERS_ACTION = "GET_DEALERS_ACTION";
export const SET_DEALERS_ACTION = "SET_DEALERS_ACTION";
export const ADD_DEALER_ACTION = "ADD_DEALER_ACTION";
export const CHANGE_DEALER_ACTION = "CHANGE_DEALER_ACTION";
export const DELETE_DEALER_ACTION = "DELETE_DEALER_ACTION";

export const getDealers = dealers =>({
    type: GET_DEALERS_ACTION,
    payload: dealers
})

export const setDealers = dealers =>({
    type: SET_DEALERS_ACTION,
    payload: dealers
})

export const addDealer = dealer => ({
    type: ADD_DEALER_ACTION,
    payload: dealer
})

export const editDealer = dealer => ({
    type: CHANGE_DEALER_ACTION,
    payload: dealer
})

export const deleteDealer = dealer => ({
    type: DELETE_DEALER_ACTION,
    payload: dealer
})