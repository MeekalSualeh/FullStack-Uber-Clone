const AnimatedVehicle = ({
    imgSrc, 
    imgCover = false, 
    mtClass
}) => {
  return (
    <div className={`w-screen flex justify-center relative ${mtClass}`}>
        <div className="w-44 h-14 flex bg-green-200 justify-center rounded-4xl opacity-80">
            <div className="w-32 h-12 bg-blue-300 opacity-65 rounded-4xl">

            </div>
        </div>


        <div className={`absolute w-30 ${imgCover ? "h-28 -top-15" : "h-20 -top-7"}`}>
            <img src={imgSrc} 
            alt="Vehicle Image" 
            className={`${imgCover ? "object-cover" : "object-contain"} w-full h-full drop-shadow-black drop-shadow-xs`}
            />
        </div>
    </div>
  )
}

export default AnimatedVehicle
