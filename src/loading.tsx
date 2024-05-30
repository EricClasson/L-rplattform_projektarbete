

const Loading = () => {
  // Show this component for two seconds
  setTimeout(() => {
    return <h1 className='text-center font-extrabold'>Loading...</h1>
  }, 5000)
  return (
    <div className="text-center flex justify-center items-center">
        Loading data ...
    </div>
  )
}

export default Loading