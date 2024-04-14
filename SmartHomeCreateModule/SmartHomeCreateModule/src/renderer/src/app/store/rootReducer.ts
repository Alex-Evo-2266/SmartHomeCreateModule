import { navigationReducer } from "@renderer/features/Navigation";
import {bottomSheetsReducer} from "@renderer/shared/lib/reducers/bottomSheetsReducer";
import {dialogReducer} from "@renderer/shared/lib/reducers/dialogReducer";
import {menuReducer} from "@renderer/shared/lib/reducers/menuReducer";
import snackbarReducer from "@renderer/shared/lib/reducers/snackbarReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    dialog: dialogReducer,
    bottomSheets: bottomSheetsReducer,
    menu: menuReducer,
    snackbar: snackbarReducer,
    navigation: navigationReducer,
})