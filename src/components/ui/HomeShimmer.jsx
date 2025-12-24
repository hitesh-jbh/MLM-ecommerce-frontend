import React from 'react'

const HomeShimmer = () => {
  return (
    <div className="animate-pulse w-full overflow-hidden">
      <div className='bg-gray-300 h-64 md:h-[480px] w-full'></div>

      <div className='py-8 px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='bg-gray-300 h-[270px] w-full rounded-md'></div>
        ))}
      </div>

      <div className='px-4 md:px-12 pb-10'>
        <div className='bg-gray-300 h-[140px] w-full max-w-[430px] rounded-md'></div>
      </div>

      <div className='p-4 md:p-12 bg-gray-200 flex flex-col md:flex-row gap-8'>
        <div className='bg-gray-300 h-[270px] flex-1 rounded-md'></div>
        <div className='bg-gray-300 h-[270px] flex-1 rounded-md'></div>
      </div>
    </div>
  )
}

export default HomeShimmer