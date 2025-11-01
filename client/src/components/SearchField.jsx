import React from 'react'

const SearchField = ({ label, value, onChange, name, onClick}) => {
  return (
    <>
     <input type="text" 
     placeholder={label}
     name={name}
     className='bg-gray-200 w-80 h-16 rounded-lg border-1 border-slate-300 font-semibold text-xl text-slate-700 tracking-tight pl-9 pr-3 focus:ring-2 focus:ring-blue-400 box-border outline-none transition-ring duration-250 ease-out'
     value={value}
     onChange={onChange}
     onClick={onClick}/>
    </>
  )
}

export default SearchField
