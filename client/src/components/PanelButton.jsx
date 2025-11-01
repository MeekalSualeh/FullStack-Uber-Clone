const PanelButton = ({buttonName, onClick, disabled=false}) => {
  return (
    <>
        <button
        onClick={onClick}
        disabled={disabled}
        className={`${disabled? "cursor-not-allowed opacity-50" : "cursor-pointer"} text-lg py-4 w-9/10 font-semibold bg-black text-white rounded-lg`}>
            {buttonName}
        </button>
    </>
  )
}

export default PanelButton
