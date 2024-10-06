import React from 'react'
import { BsInstagram, BsYoutube } from 'react-icons/bs'

const Social = () => {

    return (
        <div>
            <div className='grid gap-10 mt-20'>
                <h1 className='text-5xl text-center font-bold'>We are on social media</h1>
                <div className='flex items-center justify-center gap-10'>
                    <a href="https://instagram.com/shakhriyor_saparboev">
                        <BsInstagram size={80} color='blue' />
                    </a>
                    <a href="https://www.youtube.com/@TOPLC-xl4bk">
                        <BsYoutube size={100} color='blue' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Social