const ErrorComponent = ({error}) => {
  return (
    <div
    className='border-1 border-l-7 border-red-600 text-red-500 flex justify-between rounded-md text-sm font-medium py-1 tracking-tight items-center'>
      <p className='ml-3'>
        {error}
      </p>
      <div className='mr-3 text-lg text-red-600'>
        <i className="ri-close-circle-line w-full"></i>
      </div>
    </div>
  )
}

export default ErrorComponent
