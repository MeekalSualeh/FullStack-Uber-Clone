const PanelButton = ({
  buttonName, 
  onClick, 
  disabled=false,
  buttonExtraClasses,
  color=false
}) => {
  return (
    <>
        <button
        onClick={onClick}
        disabled={disabled}
        className={`${disabled? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${color ? `${color}` : "bg-black"} text-lg py-4 w-full font-semibold text-white rounded-lg`}>
            {buttonName}
        </button>
    </>
  )
}

export default PanelButton
