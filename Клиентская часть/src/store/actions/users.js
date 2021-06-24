export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export const SET_USERS_ACTION = 'SET_USERS_ACTION';
export const ADD_USER_ACTION = 'ADD_USER_ACTION';
export const CHANGE_USER_ACTION = 'CHANGE_USER_ACTION';
export const DELETE_USER_ACTION = 'DELETE_USER_ACTION';

export const getUsers = users =>({
    type: GET_USERS_ACTION,
    payload: users
})

export const setUsers = users =>({
    type: SET_USERS_ACTION,
    payload: users
})

export const addUser = user => ({
    type: ADD_USER_ACTION,
    payload: user
})

export const editUser = user => ({
    type: CHANGE_USER_ACTION,
    payload: user
})

export const deleteUser = user =>({
    type: DELETE_USER_ACTION,
    payload: user
})