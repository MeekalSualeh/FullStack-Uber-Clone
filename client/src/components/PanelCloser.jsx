import { RiCloseLine } from "@remixicon/react"

const PanelCloser = ({onClick, size, color}) => {
  return (
    <button
    onClick={onClick}
    className={`${size} ${color} h-fit inline-flex justify-center items-center p-1 rounded-full hover:opacity-80 cursor-pointer`}>
        <RiCloseLine width="1em" height="1em" />
    </button>
  )
}

export default PanelCloser
