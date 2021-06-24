import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {basketReducer} from "./basket";
import {catalogReducer} from "./catalog";
import {dealersReducer} from "./dealers";
import {historyReducer} from "./price-history";
import {suppliesReducer} from "./supplies";
import {usersReducer} from "./users";
import {detailsReducer} from "./details";

export default combineReducers({
    auth: authReducer,
    basket: basketReducer,
    catalog: catalogReducer,
    dealers: dealersReducer,
    details: detailsReducer,
    history: historyReducer,
    supplies: suppliesReducer,
    users: usersReducer,
})