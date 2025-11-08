import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import PanelCloser from "./PanelCloser"
import PanelMinimizer from "./PanelMinimizer"

const Panel = ({ 
  isActive,
  onInActive,
  isMinimized = false,
  minimizedY = "63%",
  heading,
  onPanelClose = false,
  onPanelMinimize = false,
  onPanelMaximize = false,
  defaultY = "100%",
  children }) => {

  const panelRef = useRef(null)
  const minimizerRef = useRef(null)

  useGSAP(() =>{
    const panelElement = panelRef.current;
    // const minimizeElement = minimizerRef.current

    // console.log(minimizeElement)
    // console.log(minimizerRef.current)

    const onActivePanelOptions = {
      y:"0%",
      borderTopLeftRadius:0,
      borderTopRightRadius:0,
    }

    const onActiveMinimizeOptions = {
      rotate: -180,
      duration: 0.8
    }

    const onMinimizePanelOptions = {
      y:minimizedY,
      borderTopLeftRadius:32,
      borderTopRightRadius:32
    }

    const onMinimizeMaximizeOptions = {
      rotate: 0,
      duration: 0.8
    }

    const onInActiveOptions = {
      y:"100%",
      borderTopLeftRadius:32,
      borderTopRightRadius:32,
      onComplete:onInActive
    }

    if(isActive){
      gsap.to(panelElement, onActivePanelOptions)

      if(onPanelMinimize) gsap.to(minimizerRef.current, onActiveMinimizeOptions)
    }
  
    else if(isMinimized){
      gsap.to(panelElement, onMinimizePanelOptions)

      if(onPanelMaximize) gsap.to(minimizerRef.current, onMinimizeMaximizeOptions)
    }

    else if(!isActive && !isMinimized) gsap.to(panelElement, onInActiveOptions)

  }, [isActive, isMinimized, panelRef.current, minimizerRef.current])

  return (
    <div
      ref={panelRef} 
      className='h-full flex flex-col w-screen absolute bottom-0 bg-white rounded-t-4xl transform'
      style={{transform: `translateY(${defaultY})`}}>

        <div
        className='flex justify-between mx-7 mt-6'>

          <h1 className='h-fit text-2xl text-slate-800 font-bold'
          >{heading}</h1>

          {(isActive && onPanelClose) && <PanelCloser
          size="text-lg"
          color="bg-gray-100"
          onClick={onPanelClose}/>
          }

          {(onPanelMinimize && (isActive || isMinimized)) && <PanelMinimizer
          ref={minimizerRef}
          size="text-2xl"
          color="bg-gray-100"
          onClick={isMinimized ? onPanelMaximize : onPanelMinimize}/>
          }

        </div>
        
        {children}

    </div>
  )
}

export default Panel