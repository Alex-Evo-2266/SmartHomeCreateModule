import React,{useEffect,useCallback} from 'react'

interface Props{
  id: string,
  text: string,
  className?: string,
  onClick?: (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void
}

export const RunText:React.FC<Props> = ({id, text,className, onClick})=>{

  const anim = useCallback(()=>{
    let el = document.getElementById(`p-${id}`)
    let el2 = document.getElementById(`div-${id}`)
    if (!el || !el2) return
    if(el.clientWidth >= el2.clientWidth){
      el.className="scroll"
      el.innerHTML=`| ${text} | ${text}`
    }
    else{
      el.className=""
    }
  },[id,text])

  useEffect(()=>{
    anim()
  },[anim])

  return(
    <div id={`div-${id}`} onClick={onClick} className={`RunText ${className}`}>
      <p id={`p-${id}`}>{text}</p>
    </div>
  )
}
