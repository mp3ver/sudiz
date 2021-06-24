export const GET_SUPPLIES_ACTION = "GET_GAMES_ACTION";
export const SET_SUPPLIES_ACTION = "SET_SUPPLIES_ACTION";
export const GET_MY_SUPPLIES_ACTION = "GET_MY_SUPPLIES_ACTION";
export const SET_MY_SUPPLIES_ACTION = "SET_MY_SUPPLIES_ACTION";
export const ADD_SUPPLY_ACTION = "ADD_SUPPLY_ACTION";
export const CHANGE_SUPPLY_ACTION = "CHANGE_SUPPLY_ACTION";
export const DELETE_SUPPLY_ACTION = "DELETE_SUPPLY_ACTION";

export const getSupplies = supplies =>({
    type: GET_SUPPLIES_ACTION,
    payload: supplies
})

export const setSupplies = supplies =>({
    type: SET_SUPPLIES_ACTION,
    payload: supplies
})

export const getMySupplies = supplies =>({
    type: GET_MY_SUPPLIES_ACTION,
    payload: supplies
})

export const setMySupplies = supplies =>({
    type: SET_MY_SUPPLIES_ACTION,
    payload: supplies
})

export const addSupply = supply => ({
    type: ADD_SUPPLY_ACTION,
    payload: supply
})

export const editSupply = supply => ({
    type: CHANGE_SUPPLY_ACTION,
    payload: supply
})

export const deleteSupply = supply => ({
    type: DELETE_SUPPLY_ACTION,
    payload: supply
})