import React,{useState} from 'react'
import { ContextMenu } from './contextMenu'
import { IContextItem } from './contextMenuElement'

interface Props{
  buttons:IContextItem[],
  className?: string,
  style?: React.CSSProperties,
}

export const DopMenu:React.FC<Props> = ({buttons=[], className, style={}}) =>{
  const [visible, setVisible] = useState(false)

  if(buttons?.length === 0){
    return null
  }

  return(
    <div className='context-menu-container' style={style}>
    <div className="menuTogleBtn" onClick={()=>setVisible(!visible)}>
      <i className="fas fa-ellipsis-v"></i>
    </div>
    {
      (visible)?
      <ContextMenu hide={()=>setVisible(false)} buttons={buttons} className={className}/>
      :null
    }
    </div>
  )
}
