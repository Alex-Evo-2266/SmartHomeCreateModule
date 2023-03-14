import React from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { CardTypeAction } from "../../store/reducers/cardReducer";

export const Card:React.FC = () =>{
	const card = useTypeSelector(state=>state.card)
	const dispatch = useDispatch()

	if (!card.visible)
	return null
	
	return(
		<div className="dialog_wrapper" style={{zIndex: 998}}>
			<>
				<div className="backdrop" onClick={()=>dispatch({type:CardTypeAction.CARD_HIDE})}></div>
				{card.content}
			</>
		</div>
	)
}

interface Props{
	children?:React.ReactNode,
	className?: string,
	onClick?: (e?:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void,
	onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> (boolean | void)
	
}

export const BaseCard:React.FC<Props> = ({children, className, onClick, onContextMenu})=>{

  const click = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    if(typeof(onClick)==="function")
      onClick(e)
  }
  
  return(
    <div onClick={click} onContextMenu={onContextMenu} className={`base-card-container card-container ${className}`}>
    	{children}
    </div>
  )
}
