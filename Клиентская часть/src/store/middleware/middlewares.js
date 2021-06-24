import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {catalogMiddleware} from "./catalog";
import {dealersMiddleware} from "./dealers";
import {detailsMiddleware} from "./details";
import {historyMiddleware} from "./price-history";
import {suppliesMiddleware} from "./supplies";
import {usersMiddleware} from "./users";


export const middleware = applyMiddleware(...[thunk, catalogMiddleware(), dealersMiddleware(), detailsMiddleware(), historyMiddleware(), suppliesMiddleware(), usersMiddleware()]);