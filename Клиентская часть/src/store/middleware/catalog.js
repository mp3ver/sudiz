import {auth} from "../../utils/utils";
import {
    GET_CATALOG_ACTION,
    ADD_CATALOG_ACTION,
    DELETE_CATALOG_ACTION,
    CHANGE_CATALOG_ACTION,
    setCatalog
} from "../actions/catalog";

export const catalogMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_CATALOG_ACTION:
                fetch("/api/catalog", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "GET",
                    body: JSON.stringify(action.payload)
                })
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        } else {
                            throw new Error("Приостановлен несанкционированный доступ")
                        }
                    })
                    .then(jsonData => store.dispatch(setCatalog(jsonData))).catch((error) => alert(error.message));
                break;
            case ADD_CATALOG_ACTION:
                fetch("/api/catalog/", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "POST",
                    body: JSON.stringify(action.payload)
                }).then(response => {
                        if (response.status === 201) {
                            return response.json();
                        } else {
                            throw new Error("Не удалось добавить")
                        }
                    }
                ).then(jsonData => {
                    let catalog = store.getState().catalog.catalog.slice();
                    catalog.push(jsonData);
                    store.dispatch(setCatalog(catalog));
                }).catch((error) => alert(error.message))
                break;
            case CHANGE_CATALOG_ACTION:
                fetch("/api/catalog/" + action.payload.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "PATCH",
                    body: JSON.stringify(action.payload)
                }).then(response => {
                        if (response.status === 200) {
                            let catalog = store.getState().catalog.catalog.slice();
                            let changedCatalog = catalog.map(item =>
                                item.id === action.payload.id ?
                                    action.payload : item
                            )
                            store.dispatch(setCatalog(changedCatalog));
                        } else {
                            alert("Не удалось изменить")
                        }
                    }
                )
                break;
            case DELETE_CATALOG_ACTION:
                fetch("/api/catalog/" + action.payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "DELETE",
                }).then(response => {
                        if (response.status === 200) {
                            let catalog = store.getState().catalog.catalog.filter(item => item.id !== action.payload);
                            store.dispatch(setCatalog(catalog));
                        } else {
                            alert("Не удалось удалить")
                        }
                    }
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}