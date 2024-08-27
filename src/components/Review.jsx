import { Avatar } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Review = () => {
    const [state, setState] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get('https://fe100a235e57a25f.mokky.dev/reviews')
            setState(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (state.length) {
        return (
            <div className='grid gap-5 mt-10'>
                <h1 className='text-5xl font-medium text-center'>Reviews about us</h1>
                <div className='flex items-center overflow-x-scroll gap-5 py-8 max-sm:pl-5'>
                    {state.map((item, index) => (
                        <div key={index} className='grid content-start gap-5 min-w-[350px] h-[300px] rounded-xl shadow-xl p-7 border'>
                            <div className='flex items-center gap-5'>
                                <Avatar />
                                <div className='grid'>
                                    <h1 className='text-xl font-medium'>{item.name}</h1>
                                    <h1 className='text-sm text-gray-500'>{item.date}</h1>
                                </div>
                            </div>
                            <h1 className='text-base text-black overflow-auto'>{item.comment}</h1>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Review