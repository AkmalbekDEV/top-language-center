import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useTranslation } from 'react-i18next'
import Shakhriyor from '../assets/shakhriyor.png'
import { Link } from 'react-router-dom'

const Teachers = () => {
    const [t, i18n] = useTranslation("global")

    return (
        <section id='teachers' className='grid gap-10 mt-5 mb-20'>
            <div className='flex max-sm:flex-col-reverse gap-16 max-sm:gap-10 items-center px-8 py-5 max-sm:px-5 max-sm:py-5'>
                <div className='grid content-between gap-10 max-sm:gap-5 max-sm:text-center'>
                    <h1 className='text-4xl font-bold'>Hi, I'm <span className='text-blue-700'>Shakhriyor</span></h1>
                    <h1 className='text-3xl max-sm:text-2xl font-medium text-gray-500'>
                        Since beginning my teaching journey in 2017, I have guided thousands of students to achieve their desired IELTS scores, with hundreds reaching the C1 level. My dedication, combined with my students' thirst for knowledge and a professional approach, has consistently produced remarkable results.
                    </h1>
                </div>
                <img src={Shakhriyor} className='w-[35%] h-[80%] object-cover max-sm:w-full rounded-2xl' alt="" />
            </div>
        </section>
    )
}

export default Teachers