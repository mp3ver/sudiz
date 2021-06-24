import {auth} from "../../utils/utils";
import {
    GET_DETAILS_ACTION,
    ADD_DETAIL_ACTION,
    DELETE_DETAIL_ACTION,
    CHANGE_DETAIL_ACTION,
    setDetails
} from "../actions/details";

export const detailsMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_DETAILS_ACTION:
                fetch("/api/detail",{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "GET",
                })
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        } else {
                            throw new Error("Приостановлен несанкционированный доступ")
                        }
                    })
                    .then(jsonData => store.dispatch(setDetails(jsonData))).catch((error) => alert(error.message));
                break;
            case ADD_DETAIL_ACTION:
                fetch("/api/detail/", {
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
                    let details = store.getState().details.details.slice();
                    details.push(jsonData);
                    store.dispatch(setDetails(details));
                }).catch((error) => alert(error.message))
                break;
            case CHANGE_DETAIL_ACTION:
                fetch("/api/detail/" + action.payload.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "PATCH",
                    body: JSON.stringify(action.payload)
                }).then(response => {
                        if (response.status === 200) {
                            let details = store.getState().details.details.slice();
                            let changedDetails = details.map(detail =>
                                detail.id === action.payload.id ?
                                    action.payload : detail
                            )
                            store.dispatch(setDetails(changedDetails));
                        } else {
                            alert("Не удалось изменить")
                        }
                    }
                )
                break;
            case DELETE_DETAIL_ACTION:
                fetch("/api/detail/" + action.payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "DELETE",
                }).then(response => {
                        if (response.status === 200) {
                            let details = store.getState().details.details.filter(item => item.id !== action.payload);
                            store.dispatch(setDetails(details));
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