import React, { useContext } from 'react'
import { ProductContext } from '../queries/ProductContext';
import { Link } from 'react-router-dom';

const Courses = () => {
    const { state } = useContext(ProductContext)

    return (
        <section className='py-5'>
            <h1 className='text-center text-white text-5xl font-medium mb-10'>Our Courses</h1>
            <div className='flex items-center justify-between flex-wrap max-sm:flex-col max-sm:px-5 max-sm:gap-10'>
                {state.map((product) => {
                    return (
                        <div key={product.id} className='w-[32%] max-sm:w-full rounded-xl grid gap-5 p-5 bg-white'>
                            <img src={product.img} alt="" className='w-full object-cover h-[200px] rounded-xl' />
                            <Link to={`/item/${product.id}`}>
                                <button className='w-full outline-none rounded-xl py-3 bg-blue-700 text-lg font-medium text-white hover:shadow-md hover:shadow-blue-500 transition-all'>About this course</button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Courses