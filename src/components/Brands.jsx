import React from 'react'
import Ielts from '../assets/ielts.png'
import Cefr from '../assets/cefr.png'
import Cambridge from '../assets/cambridge.svg'
import School from '../assets/school.png'
import { Link } from 'react-router-dom'

const Brands = () => {
  return (
    <section className='flex items-center justify-between max-sm:grid max-sm:grid-cols-2 max-sm:px-10 mt-20'>
      <Link className='flex justify-center' to={"https://ielts.org"} target='_blank'>
        <img src={Ielts} alt="" className='w-[150px]' />
      </Link>
      <Link className='flex justify-center' to={"https://www.efset.org/ru/cefr"} target='_blank'>
        <img src={Cefr} alt="" className='w-[250px]' />
      </Link>
      <Link className='flex justify-center' to={"https://www.cambridgeenglish.org"} target='_blank'>
        <img src={Cambridge} alt="" className='w-[100px]' />
      </Link>
      <Link className='flex justify-center' to={"https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/school"} target='_blank'>
        <img src={School} alt="" className='w-[150px]' />
      </Link>
    </section>
  )
}

export default Brands