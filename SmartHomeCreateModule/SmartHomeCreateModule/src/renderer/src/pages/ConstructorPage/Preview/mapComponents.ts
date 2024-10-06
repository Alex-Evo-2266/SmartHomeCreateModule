import { 
    IColumns as ConstructorColumns, 
    IButton as ConstructorButton, 
    ITextField as ConstructorText,
    ICard as ConstructorCard,
    IDivider as ConstructorDivider,
    IFlexContainer as ConstructorFlex,
    IGridLayout as ConstructorGrid,
    IKeyValue as ConstructorKeyValue,
    IList as ConstructorList,
    IPanel as ConstructorPanel,
    ISelect as ConstructorSelect,
    ISlider as ConstructorSlider,
    ISendText as ConstructorSendText,
    ISwitch as ConstructorSwitch,
    IComponents as ConstructorComponent,
    IColumnElement as ConstructorColumnElement
} from "@renderer/entites/module/models/components";
import { IButton, ICard, IColumns, IComponents, IDivider, IFlexContainer, IGridLayout, IKeyValue, IList, IPanel, ISelect, ISendText, ISlider, ISwitch, ITextField, TypeComponent } from "alex-evo-web-constructor";
import { IColumnElement, ITable } from "alex-evo-web-constructor/dist/models";
import { isContainerColumn, isContainerMoreComponents, isContainerOneComponents } from "../../../entites/module/lib/helpers/utils";
import { ITable as ConstructorTable } from "@renderer/entites/module/models/table";

const mapColumn = (component: ConstructorColumns):IColumns => component
const mapButton = (component: ConstructorButton):IButton => component
const mapText = (component: ConstructorText):ITextField => component
const mapCard = (component: ConstructorCard):ICard => component
const mapDivider = (component: ConstructorDivider):IDivider => component
const mapFlexContainer = (component: ConstructorFlex):IFlexContainer => component
const mapGridContainer = (component: ConstructorGrid):IGridLayout => component
const mapKeyValue = (component: ConstructorKeyValue):IKeyValue => component
const mapList = (component: ConstructorList):IList => component
const mapPanel = (component: ConstructorPanel):IPanel => component
const mapSelect = (component: ConstructorSelect):ISelect => component
const mapSlider = (component: ConstructorSlider):ISlider => component
const mapSendText = (component: ConstructorSendText):ISendText => component
const mapSwitch = (component: ConstructorSwitch):ISwitch => component
const mapTable = (component: ConstructorTable):ITable => component

const mapByType:{[key in TypeComponent]: (component:any)=>any} = {
    [TypeComponent.COLUMNS]: mapColumn,
    [TypeComponent.TEXT]: mapText,
    [TypeComponent.BUTTON]: mapButton,
    [TypeComponent.CARD]: mapCard,
    [TypeComponent.DIVIDER]: mapDivider,
    [TypeComponent.FLEX_CONTAINER]: mapFlexContainer,
    [TypeComponent.GRID_LAYOUT]: mapGridContainer,
    [TypeComponent.KEY_VALUE]: mapKeyValue,
    [TypeComponent.LIST]: mapList,
    [TypeComponent.PANEL]: mapPanel,
    [TypeComponent.SELECT]: mapSelect,
    [TypeComponent.SEND_TEXT]: mapSendText,
    [TypeComponent.SLIDER]: mapSlider,
    [TypeComponent.SWITCH]: mapSwitch,
    [TypeComponent.TABLE]: mapTable
}

const mapColumnElement = (item:ConstructorColumnElement): IColumnElement => ({
    indexCol: item.indexCol,
    value: mapByType[item.value.type](item.value)
})

export const mapComponent = (data: ConstructorComponent): IComponents => {
    if(isContainerOneComponents(data) && data.value)
        return mapByType[data.type]({...data, value: mapByType[data.value.type](data.value)})
    else if(isContainerMoreComponents(data) && data.value)
        return mapByType[data.type]({...data, value: data.value.map(item=>mapByType[item.type](item))})
    else if(isContainerColumn(data) && data.value)
        return mapByType[data.type]({...data, value: data.value.map(mapColumnElement)})
    return mapByType[data.type](data)
}