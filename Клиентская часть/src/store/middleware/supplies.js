import {auth} from "../../utils/utils";
import {
    GET_SUPPLIES_ACTION,
    ADD_SUPPLY_ACTION,
    DELETE_SUPPLY_ACTION,
    CHANGE_SUPPLY_ACTION,
    setSupplies, GET_MY_SUPPLIES_ACTION, setMySupplies
} from "../actions/supplies";

export const suppliesMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_SUPPLIES_ACTION:
                fetch("/api/supply", {
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
                    .then(jsonData => store.dispatch(setSupplies(jsonData))).catch((error) => alert(error.message));
                break;
            case GET_MY_SUPPLIES_ACTION:
                fetch("/api/supply/my/", {
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
                    .then(jsonData => {
                        let mySupplies = jsonData.map(supply => {return {
                            vendorCode: supply.catalogRecord.detail.vendorCode,
                            deviceName: supply.catalogRecord.detail.name,
                            dealer: supply.catalogRecord.dealer.name,
                            amount: supply.amount,
                            totalPrice: supply.totalPrice,
                            date: supply.date
                        }})
                        store.dispatch(setMySupplies(mySupplies));
                    }).catch((error) => alert(error.message));
                break;
            case ADD_SUPPLY_ACTION:
                fetch("/api/supply/", {
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
                    let supplies = store.getState().supplies.supplies.slice();
                    supplies.push(jsonData);
                    store.dispatch(setSupplies(supplies));
                }).catch((error) => alert(error.message))
                break;
            case DELETE_SUPPLY_ACTION:
                fetch("/api/supply/" + action.payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "DELETE",
                }).then(response => {
                        if (response.status === 200) {
                            let supplies = store.getState().supplies.supplies.filter(item => item.id !== action.payload);
                            store.dispatch(setSupplies(supplies));
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