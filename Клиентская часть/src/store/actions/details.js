export const GET_DETAILS_ACTION = "GET_DETAILS_ACTION";
export const SET_DETAILS_ACTION = "SET_DETAILS_ACTION";
export const ADD_DETAIL_ACTION = "ADD_DETAIL_ACTION";
export const CHANGE_DETAIL_ACTION = "CHANGE_DETAIL_ACTION";
export const DELETE_DETAIL_ACTION = "DELETE_DETAIL_ACTION";

export const getDetails = details =>({
    type: GET_DETAILS_ACTION,
    payload: details
})

export const setDetails = details =>({
    type: SET_DETAILS_ACTION,
    payload: details
})

export const addDetail = detail => ({
    type: ADD_DETAIL_ACTION,
    payload: detail
})

export const editDetail = detail => ({
    type: CHANGE_DETAIL_ACTION,
    payload: detail
})

export const deleteDetail = detail => ({
    type: DELETE_DETAIL_ACTION,
    payload: detail
})