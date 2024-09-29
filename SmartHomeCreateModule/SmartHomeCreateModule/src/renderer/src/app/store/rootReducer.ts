import componentReducer from "@renderer/entites/module/lib/reducers/componentReducer";
import ModuleReducer from "@renderer/entites/module/lib/reducers/moduleReducer";
import {bottomSheetsReducer} from "@renderer/shared/lib/reducers/bottomSheetsReducer";
import {menuReducer} from "@renderer/shared/lib/reducers/menuReducer";
import snackbarReducer from "@renderer/shared/lib/reducers/snackbarReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    bottomSheets: bottomSheetsReducer,
    menu: menuReducer,
    snackbar: snackbarReducer,
    module: ModuleReducer,
    component: componentReducer,
})