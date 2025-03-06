export enum BasePages {
    COMPONENTS = "COMPONENTS",
    DATA = "DATA",
    ACTION = "ACTION"
}

export interface IBasePagesSelect {
    data: BasePages,
    title: string,
    subTitle?: string
}

export const BasePagesSelect: IBasePagesSelect[] = [
{
    data: BasePages.COMPONENTS,
    title: "components"
},
{
    data: BasePages.DATA,
    title: "data"
},
{
    data: BasePages.ACTION,
    title: "action"
}
]

export interface FormaterComponentsProps{
    onSetPage?:(data: any)=>void
}

export interface FormaterComponentsDopProps extends FormaterComponentsProps{
    onPrevPage?:()=>void
}