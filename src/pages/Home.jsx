import React from 'react'
import Hero from '../components/Hero'
import Amenities from '../components/About'
import Courses from '../components/Courses'
import Teachers from '../components/Teachers'
import Contact from '../components/Contact'
import Social from '../components/Social'
import Lessons from '../components/Lessons'

const Home = () => {
  return (
    <div>
      <div className='max-w-[1250px] mx-auto max-xl:px-10 max-sm:px-0'>
        <Hero />
      </div>
      <div className='max-w-[1250px] mx-auto max-xl:px-10 max-sm:px-0'>
        <Teachers />
      </div>
      <div className='bg-blue-600 py-10 mt-5' id='courses'>
        <div className='max-w-[1250px] mx-auto max-xl:px-10 max-sm:px-0'>
          <Courses />
        </div>
      </div>
      <div id='contact' className='max-w-[1250px] mx-auto max-xl:px-10 max-sm:px-0'>
        <Lessons />
        <Contact />
        <Social />
      </div>
    </div>
  )
}

export default Home