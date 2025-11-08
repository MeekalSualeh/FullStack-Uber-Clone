import { RiArrowDownWideFill } from "@remixicon/react"
import { forwardRef } from "react"

const PanelMinimizer = forwardRef(({onClick, size, color}, ref) => {
  return (
    <button
    ref={ref}
    onClick={onClick}
    className={`${size} ${color} h-fit inline-flex justify-center items-center p-1 rounded-full hover:opacity-80 cursor-pointer transform`}>
      <div ref={ref}>
        <RiArrowDownWideFill width="1em" height="1em" />
      </div>
    </button>
  )
})

export default PanelMinimizer
