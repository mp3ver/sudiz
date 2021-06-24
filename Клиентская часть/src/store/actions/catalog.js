export const GET_CATALOG_ACTION = "GET_CATALOG_ACTION";
export const SET_CATALOG_ACTION = "SET_CATALOG_ACTION";
export const ADD_CATALOG_ACTION = "ADD_CATALOG_ACTION";
export const CHANGE_CATALOG_ACTION = "CHANGE_CATALOG_ACTION";
export const DELETE_CATALOG_ACTION = "DELETE_CATALOG_ACTION";

export const getCatalog = catalog =>({
    type: GET_CATALOG_ACTION,
    payload: catalog
})

export const setCatalog = catalog =>({
    type: SET_CATALOG_ACTION,
    payload: catalog
})

export const addCatalog = catalog => ({
    type: ADD_CATALOG_ACTION,
    payload: catalog
})

export const editCatalog = catalog => ({
    type: CHANGE_CATALOG_ACTION,
    payload: catalog
})

export const deleteCatalog = catalog => ({
    type: DELETE_CATALOG_ACTION,
    payload: catalog
})