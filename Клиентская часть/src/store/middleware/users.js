import {auth} from "../../utils/utils";
import {
    GET_USERS_ACTION,
    ADD_USER_ACTION,
    DELETE_USER_ACTION,
    CHANGE_USER_ACTION,
    setUsers
} from "../actions/users";

export const usersMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case GET_USERS_ACTION:
                fetch("/api/user", {
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
                        let users = jsonData.map(user => {return {...user, role:user.roleUser.role}})
                        store.dispatch(setUsers(users))
                    }).catch((error) => alert(error.message));
                break;
            case ADD_USER_ACTION:
                fetch("/api/user/", {
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
                    let users = store.getState().users.users.slice();
                    users.push(jsonData);
                    store.dispatch(setUsers(users));
                }).catch((error) => alert(error.message))
                break;
            case CHANGE_USER_ACTION:
                fetch("/api/user/" + action.payload.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "PATCH",
                    body: JSON.stringify(action.payload)
                }).then(response => {
                        if (response.status === 200) {
                            let users = store.getState().users.users.slice();
                            let changedUsers = users.map(user =>
                                user.id === action.payload.id ?
                                    action.payload : user
                            )
                            store.dispatch(setUsers(changedUsers));
                        } else {
                            alert("Не удалось изменить")
                        }
                    }
                )
                break;
            case DELETE_USER_ACTION:
                fetch("/api/user/" + action.payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...auth()
                    },
                    method: "DELETE",
                }).then(response => {
                        if (response.status === 200) {
                            let users = store.getState().users.users.filter(item => item.id !== action.payload);
                            store.dispatch(setUsers(users));
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