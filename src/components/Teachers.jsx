import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useTranslation } from 'react-i18next'
import Shakhriyor from '../assets/shakhriyor.jpg'
import { Link } from 'react-router-dom'

const Teachers = () => {
    const [t, i18n] = useTranslation("global")

    return (
        <section id='teachers' className='grid gap-10 mt-5 mb-20'>
            <div className='flex max-sm:flex-col-reverse gap-16 max-sm:gap-10 items-center px-8 py-5 max-sm:px-5 max-sm:py-5'>
                <div className='grid content-between gap-10 max-sm:gap-5 max-sm:text-center'>
                    <h1 className='text-4xl font-bold'>Hi, I'm <span className='text-blue-700'>Shakhriyor</span></h1>
                    <h1 className='text-2xl font-medium text-gray-500'>
                        I began my teaching journey in 2017 and have since helped over 10,000 students, with more than 100 reaching a C1 language level. <br /> <div className='my-3'></div> I was the first in my region to score 8.5 in Writing, and my highest scores are 9 in Listening and Reading, and 8.5 in Speaking and Writing.
                    </h1>
                    <div className='max-sm:flex max-sm:justify-center'>
                        <Link download={true} className='px-8 py-2 rounded-xl bg-blue-700 w-fit text-white'>Download CV</Link>
                    </div>
                </div>
                <img src={Shakhriyor} className='w-[35%] max-sm:w-full rounded-2xl' alt="" />
            </div>
        </section>
    )
}

export default Teachers