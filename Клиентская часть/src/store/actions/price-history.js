export const GET_HISTORY_ACTION = "GET_HISTORY_ACTION";
export const SET_HISTORY_ACTION = "SET_HISTORY_ACTION";

export const getHistory = history =>({
    type: GET_HISTORY_ACTION,
    payload: history
})

export const setHistory = history =>({
    type: SET_HISTORY_ACTION,
    payload: history
})