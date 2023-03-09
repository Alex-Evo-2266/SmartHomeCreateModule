import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { alertReducer } from "./reducers/alertReducer";
import { cardReducer } from "./reducers/cardReducer";
import { dialogReducer } from "./reducers/dialogReducer";
import { menuReducer } from "./reducers/menuReducer";
import { moduleReducer } from "./reducers/moduleReducer";

const rootReduser = combineReducers({
	dialog: dialogReducer,
	card: cardReducer,
    alert: alertReducer,
	menu: menuReducer,
	module: moduleReducer
})

export type RootState = ReturnType<typeof rootReduser>


export const store = createStore(rootReduser, applyMiddleware(thunk))