import { RiUser3Fill } from "@remixicon/react"

const VehicleType = ({
    imgSrc, 
    vehicleType, 
    vehicleName, 
    tagLine, 
    fare, 
    capacity, 
    onClick, 
    isFocused, 
    imgCover = false }) => {
  return (
    <div 
    className={`${isFocused ? "ring-3 ring-black" : ""} flex mx-2 py-3 font-[helvetica] items-center rounded-xl bg-gray-100`}
    onClick={() =>{
        onClick(vehicleType, fare)
    }}>

        <div className="w-[28%] flex items-center h-full">
            <img src={imgSrc} 
            alt="Vehicle image" 
            className={`${imgCover ? "object-cover" : "object-contain"} w-full h-full`}
            />
        </div>

        <div className="flex flex-col w-6/12 gap-y-1">
            <h1 className="text-lg font-semibold text-black bg-blend-screen items-center">
                {vehicleName}
            </h1>

            <h2 className="text-slate-700 text-sm">
                {tagLine}
            </h2>

            <div className="gap-x-1 flex items-center">
                <RiUser3Fill height="1em" widths="1em" color="#000" />
                {capacity}
            </div>
        </div>

        <div className="w-3/13 h-full">
        <h1 className={`${fare < 10000? "text-lg" : "text-md"} h-10 text-black font-semibold flex items-center gap-x-1`}>
            <p className="text-xs">PKR</p>
            {fare}
        </h1>
        </div>

    </div>
  )
}

export default VehicleType