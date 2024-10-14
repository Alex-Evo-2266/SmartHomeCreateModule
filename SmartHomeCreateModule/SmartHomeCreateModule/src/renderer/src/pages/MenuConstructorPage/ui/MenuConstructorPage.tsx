import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { setMenuModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { Button, IMenuItem, IMenuSubItem } from 'alex-evo-sh-ui-kit'
import { IMenu } from 'alex-evo-web-constructor'
import { IMenuItem as IConstructorMenuItem } from 'alex-evo-web-constructor'
import { IMenuSubItem as IConstructorSubMenuItem } from 'alex-evo-web-constructor'
import { MenuItemDialog } from '@renderer/widgets/MenuItemDialog'
import { MenuPreview } from './Preview'

export const ConstructorMenu:React.FC = () => {

    const container = useRef<HTMLDivElement>(null)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const {menu: menuList} = useAppSelector(state=>state.module)
    const {index} = useParams()
    const menu = useMemo<IMenu | undefined | null>(()=>index && menuList[index], [index, menuList])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [addItemDialogVisible, setAddItemDialogVisible] = useState<boolean>(false)
    const [editItemDialogVisible, setEditItemDialogVisible] = useState<null | number>(null)
    const [addSubItemDialogVisible, setAddSubItemDialogVisible] = useState<null | number>(null)
    const [editSubItemDialogVisible, setEditSubItemDialogVisible] = useState<null | [number, number]>(null)

    const addItem = useCallback((data: IConstructorMenuItem)=>{
        let newList = menuList.slice()
        newList[Number(index)].components.push(data)
        dispatch(setMenuModule(newList))
        setAddItemDialogVisible(false)
    },[menuList, index])

    const editItem = useCallback((data: IConstructorMenuItem, indexMenuItem: number)=>{
        let newList = menuList.slice()
        newList[Number(index)].components[indexMenuItem] = data
        dispatch(setMenuModule(newList))
        setEditItemDialogVisible(null)
    },[menuList, index])

    const addSubItem = useCallback((data: IConstructorMenuItem, indexItem:number)=>{
        let newList = menuList.slice()
        newList[Number(index)].components[indexItem].subItems?.push(data)
        dispatch(setMenuModule(newList))
        setAddSubItemDialogVisible(null)
    },[menuList, index])

    const editSubItem = useCallback((data: IConstructorMenuItem, indexMenuItem: [number, number])=>{
        let newList = menuList.slice()
        let item = newList[Number(index)].components[indexMenuItem[0]]
        if(item.subItems)
            item.subItems[indexMenuItem[1]] = data
        dispatch(setMenuModule(newList))
        setEditSubItemDialogVisible(null)
    },[menuList, index])

    const getSubItem = (data:IMenu | undefined | null, index: [number, number]) => {
        if(!data) return
        return data.components[index[0]].subItems?.[index[1]]
    }

    function mapSubMenu(items: IConstructorSubMenuItem[], indexItem:number):IMenuSubItem[]{
        let menuSubItems:IMenuSubItem[] = items.map((item, index)=>{
            return{
                title: item.label,
                icon: item.icon,
                activated: item.activated,
                onClick: ()=>setEditSubItemDialogVisible([indexItem, index])
            }
        })
        menuSubItems.unshift({
            title: 'edit item',
            onClick: ()=>setEditItemDialogVisible(indexItem)
        })
        menuSubItems.push({
            title: 'add item',
            onClick: ()=>setAddSubItemDialogVisible(indexItem)
        })
        return menuSubItems
    }

    function mapMenu(items: IConstructorMenuItem[]):IMenuItem[]{
        let menuItems:IMenuItem[] = items.map((item, index)=>{
            return {
                title: item.label,
                subItems: item.subItems && mapSubMenu(item.subItems, index),
                activated: item.activated,
                icon: item.icon,
                onClick: ()=>setEditItemDialogVisible(index)
            }
        })
        menuItems.push({
            title: "add item",
            onClick: ()=>setAddItemDialogVisible(true)
        })
        return menuItems
    }

    useEffect(()=>{
        console.log(menuList)
    },[menuList])

    useEffect(()=>{
        setIsLoad(true)
    },[])

    return(
        <>
            <div>
                <Button onClick={()=>navigate('/menu')}>save</Button>
                <div ref={container}></div>
                {
                    container.current && isLoad && <MenuPreview constainer={container.current} blocks={[{items:mapMenu(menu?.components ?? [])}]}/>
                }
            </div>
        {addItemDialogVisible && <MenuItemDialog onSelect={addItem} onHide={()=>setAddItemDialogVisible(false)}/>}
        {editItemDialogVisible !== null && <MenuItemDialog data={menu?.components[editItemDialogVisible]} onSelect={(data)=>editItem(data, editItemDialogVisible)} onHide={()=>setEditItemDialogVisible(null)}/>}
        {addSubItemDialogVisible !== null && <MenuItemDialog isSubItem onSelect={(data)=>addSubItem(data, addSubItemDialogVisible)} onHide={()=>setAddSubItemDialogVisible(null)}/>}
        {editSubItemDialogVisible !== null && <MenuItemDialog isSubItem data={getSubItem(menu, editSubItemDialogVisible)} onSelect={(data)=>editSubItem(data, editSubItemDialogVisible)} onHide={()=>setEditSubItemDialogVisible(null)}/>}
        </>
        
    )
}