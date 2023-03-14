import React from 'react'
import {ContextMenuElement, IContextItem} from './contextMenuElement'

interface Props{
  buttons:IContextItem[],
  className?: string,
  style?: React.CSSProperties,
  hide?:()=>void,
  x?:number,
  y?:number
}

export const ContextMenu:React.FC<Props> = ({buttons=[], className, style, hide, x, y}) =>{

  if(buttons?.length === 0){
    return null
  }

  console.log(buttons)

  return(
    <>
    <div className="backGlass" onClick={hide}></div>
    <div style={style} className={`contextmenu show ${className}`}>
      {
        buttons.map((item, index)=>{
          if (item.type === "dividers")
            return(
              <div key={index} className="dividers"></div>
            )
          return(
            <ContextMenuElement key={index} item={item} hide={hide}/>
          )
        })
      }
    </div>
    </>
  )
}
