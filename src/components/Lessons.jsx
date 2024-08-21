import React from 'react'

const Lessons = () => {
    return (
        <div className='grid gap-14 mt-16'>
            <h1 className='font-medium text-5xl text-center text-blue-700'>Video Lessons</h1>
            <div className='flex items-center justify-evenly gap-10 overflow-x-scroll px-5'>
                <div className='rounded-xl shadow-xl grid p-5 min-w-[48%] max-sm:min-w-[100%] mb-10 max-sm:mb-8'>
                    <img src="https://miro.medium.com/v2/resize:fit:3840/1*3l_gNnYqeGpwNUoQEYGM9w.jpeg" alt="" />
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-medium text-blue-700 mt-3'>Title</h1>
                        <h1 className='text-xl text-gray-400 mt-3'>Free</h1>
                    </div>
                </div>
                <div className='rounded-xl shadow-xl grid p-5 min-w-[48%] max-sm:min-w-[100%] mb-10 max-sm:mb-8'>
                    <img src="https://miro.medium.com/v2/resize:fit:3840/1*3l_gNnYqeGpwNUoQEYGM9w.jpeg" alt="" />
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-medium text-blue-700 mt-3'>Title</h1>
                        <h1 className='text-xl text-gray-400 mt-3'>Free</h1>
                    </div>
                </div>
                <div className='rounded-xl shadow-xl grid p-5 min-w-[48%] max-sm:min-w-[100%] mb-10 max-sm:mb-8'>
                    <img src="https://miro.medium.com/v2/resize:fit:3840/1*3l_gNnYqeGpwNUoQEYGM9w.jpeg" alt="" />
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-medium text-blue-700 mt-3'>Title</h1>
                        <h1 className='text-xl text-gray-400 mt-3'>Free</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lessons