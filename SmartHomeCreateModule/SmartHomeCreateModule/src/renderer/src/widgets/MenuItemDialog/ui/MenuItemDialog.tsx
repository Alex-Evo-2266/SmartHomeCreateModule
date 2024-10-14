import { BaseActionCard, BasicTemplateDialog, Button, ContentBox, FilledButton, SigmentedButton, TextField } from "alex-evo-sh-ui-kit"
import { ActionType, IMenuItem, IMenuSubItem } from "alex-evo-web-constructor"
import { useCallback, useState } from "react"
import { EditActionDialog } from "./EditActionMenu"
import { DialogPortal } from "@renderer/shared/ui"
import { BaseAction } from "@renderer/entites/module/models/components"


interface AddItemComponentDialogProp {
    onHide: ()=>void
    onSelect: (data: IMenuItem)=>void
    data?: IMenuItem
    isSubItem?: boolean
}

export const MenuItemDialog = ({onHide, onSelect, data, isSubItem}:AddItemComponentDialogProp) => {

    const [label, setLabel] = useState<string>(data?.label ?? "")

    const [action, setAction] = useState<BaseAction>(data?.action ?? {
        action_type: ActionType.NONE,
        action_target: "",
    })

    const [subItem, setSubItem] = useState<IMenuSubItem[] | undefined>(data?.subItems || undefined)

    const getMode = (subItem:IMenuSubItem[] | undefined) => subItem === undefined?"action":"sub item"

    const changeMode = useCallback((value: string[])=>{
        if(value[0] === 'action')
            setSubItem(undefined)
        else
            setSubItem([])
    },[])

    const save = () => {
        onSelect({label, action, subItems:subItem})
    }

    return(
        <DialogPortal>
            <BasicTemplateDialog header="add item" action={<ButtonsAction onHide={onHide} onSave={save}/>}>
                <ContentBox label="base">
                    <TextField border placeholder="label" value={label} name="label" onChange={e=>setLabel(e.target.value)}/>
                    {!isSubItem && <SigmentedButton items={["action", "sub item"]} value={getMode(subItem)} onChange={changeMode}/>}
                    <EditActionDialog onChange={setAction} data={action}/>
                </ContentBox>
            </BasicTemplateDialog>
        </DialogPortal>
    )
}


interface AddItemDialogActionProps{
    onSave:()=>void
    onHide:()=>void
}

function ButtonsAction({onSave, onHide}:AddItemDialogActionProps){
    return(
        <BaseActionCard>
            <Button onClick={onHide}>cancel</Button>
            <FilledButton onClick={onSave}>save</FilledButton>
        </BaseActionCard>
    )
}