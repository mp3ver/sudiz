import {createStore} from "redux";
import reducers from "./reducers/reducers";
import {middleware} from "./middleware/middlewares";

export default function configureStore() {
    return createStore(reducers, {}, middleware);
}