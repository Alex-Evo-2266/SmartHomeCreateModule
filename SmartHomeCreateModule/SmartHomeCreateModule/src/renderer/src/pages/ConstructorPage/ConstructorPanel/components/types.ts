import { IComponents } from "@renderer/entites/module/models/components"

export interface EditDialogProps<T extends IComponents>{
    onChange: (data: T)=>void
    data: T
    onHide: ()=>void
}

export interface BasePropsComponent<T>{
    component: T, 
    onChange: (data: T)=>void
    onDelete: ()=>void,
}

export interface OptionVisible{
    borderRadius?: boolean;
    color?: boolean;
    backgroundColor?: boolean;
    fontSize?: boolean;
    width?: boolean;
    height?: boolean;
    pozition?: boolean;
    margin?: boolean;
    padding?: boolean;
}