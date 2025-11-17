import PanelButton from "../components/PanelButton"
import AnimatedTitlePing from "../components/AnimatedTitlePing"
import { RiErrorWarningFill } from "@remixicon/react"

const RideCancelledPanel = ({
  onGoBack,
  rideCancelledBy
}) => {

  return (
    <>
      <div className="mx-7 mt-15 flex flex-col items-center gap-y-12 font-[helvetica]">
        <div className="-mb-7">
          <RiErrorWarningFill size={50}/>
        </div>
        
        <AnimatedTitlePing
          steadyColor="bg-red-500"
          blinkingColor="bg-red-500"
          title={`Ride Cancelled By ${rideCancelledBy}`}
          />

          <p className="text-center text-md text-black font-semibold">
            Due to unforeseen circumstances Ride has been cancelled by {rideCancelledBy}. please follow the given instructions
          </p>

          <h1 className="text-md text-center font-semibold text-black">
            Click on <span className="text-lg text-red-500">'Go Back'</span> Button to go to homepage
          </h1>

      </div>

      <div
      className='absolute bottom-10 w-screen flex flex-col items-center gap-y-4 px-4'>
        <PanelButton 
        buttonName="Go Back"
        onClick={onGoBack} 
        />
      </div>
    
    </>
  )
}

export default RideCancelledPanel
