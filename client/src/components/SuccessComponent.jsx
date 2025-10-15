const SuccessComponent = ({message = "Operation Successful"}) => {
  return (
    <div
    className='border-1 border-l-7 border-green-600 text-green-500 flex justify-between rounded-md text-sm font-medium py-1 tracking-tight items-center'>
      <p className='ml-3'>
        {message}
      </p>
      <div className='mr-3 text-lg text-green-600'>
        <i className="ri-close-circle-line w-full"></i>
      </div>
    </div>
  )
}

export default SuccessComponent
