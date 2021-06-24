import {auth} from "../../utils/utils";
import {
    GET_DEALERS_ACTION,
    ADD_DEALER_ACTION,
    DELETE_DEALER_ACTION,
    CHANGE_DEALER_ACTION,
    setDealers
} from "../actions/dealers";

export const dealersMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_DEALERS_ACTION:
                fetch("/api/dealer", {
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
                    .then(jsonData => store.dispatch(setDealers(jsonData))).catch((error) => alert(error.message));
                break;
            case ADD_DEALER_ACTION:
                fetch("/api/dealer/", {
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
                    let dealers = store.getState().dealers.dealers.slice();
                    dealers.push(jsonData);
                    store.dispatch(setDealers(dealers));
                }).catch((error) => alert(error.message))
                break;
            case CHANGE_DEALER_ACTION:
                fetch("/api/dealer/" + action.payload.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "PATCH",
                    body: JSON.stringify(action.payload)
                }).then(response => {
                        if (response.status === 200) {
                            let dealers = store.getState().dealers.dealers.slice();
                            let changedDealers = dealers.map(dealer =>
                                dealer.id === action.payload.id ?
                                    action.payload : dealer
                            )
                            store.dispatch(setDealers(changedDealers));
                        } else {
                            alert("Не удалось изменить")
                        }
                    }
                )
                break;
            case DELETE_DEALER_ACTION:
                fetch("/api/dealer/" + action.payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "DELETE",
                }).then(response => {
                        if (response.status === 200) {
                            let dealers = store.getState().dealers.dealers.filter(item => item.id !== action.payload);
                            store.dispatch(setDealers(dealers));
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