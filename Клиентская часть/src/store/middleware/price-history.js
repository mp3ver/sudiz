import {GET_HISTORY_ACTION, setHistory} from "../actions/price-history";
import {auth} from "../../utils/utils";

export const historyMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_HISTORY_ACTION:
                fetch("/api/price_history", {
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
                    .then(jsonData => store.dispatch(setHistory(jsonData))).catch((error) => alert(error.message));
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}