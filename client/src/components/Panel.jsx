import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import PanelCloser from "./PanelCloser"

const Panel = ({ 
  isActive,
  onInActive,
  isMinimized = false,
  minimizedY = "63%",
  heading,
  onPanelClose,
  children }) => {

  const panelRef = useRef(null)

  useGSAP(() =>{
    const element = panelRef.current

    if(isActive){

      gsap.to(element, {
        y:"0%",
        borderTopLeftRadius:0,
        borderTopRightRadius:0
      })
    }

    else if(!isActive && !isMinimized){

      gsap.to(element, {
        y:"100%",
        onComplete:onInActive
      })
    }

    else if(isMinimized){

      gsap.to(element, {
        y:minimizedY,
        borderTopLeftRadius:32,
        borderTopRightRadius:32
      })
    }

  }, [isActive, isMinimized])

  return (
    <div
      ref={panelRef} 
      className='h-full flex flex-col w-screen absolute bottom-0 bg-white rounded-t-4xl transform translate-y-[100%]'>

        <div
        className='flex justify-between mx-7 mt-6'>

          <h1 className='h-fit text-2xl text-slate-800 font-bold'
          >{heading}</h1>

          {isActive && <PanelCloser
          size="text-lg"
          color="bg-gray-100"
          onClick={onPanelClose}/>
          }

        </div>
        
        {children}

    </div>
  )
}

export default Panel
