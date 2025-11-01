const Suggestion = ({description, onClick}) => {
  return (
    <div
    onClick={onClick}
    className='bg-gray-300 hover:bg-gray-600 text-gray-800 min-h-fit w-8/10 py-4 px-3 cursor-pointer rounded-lg overflow-y-auto'>
        
        <h1 className='text-lg'>
            {description}
        </h1>
      
    </div>
  )
}

export default Suggestion
