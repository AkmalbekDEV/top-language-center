import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiArrowToRight } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { CgNametag } from 'react-icons/cg'
import { MdCreditScore, MdScore, MdSportsScore } from 'react-icons/md'
import { TiTime } from 'react-icons/ti'

const Results = () => {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const res = await axios.get('https://a67474a4e6e67b1c.mokky.dev/results?sortBy=-score')
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='max-w-[1250px] mx-auto'>
            <div className='mt-44 rounded-2xl shadow-2xl p-8 max-sm:p-3 max-sm:mx-5 border'>
                <h1 className='font-medium text-4xl max-sm:mx-3 max-sm:text-3xl max-sm:mt-2 text-center mb-8'>Latest high results</h1>
                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5'>
                    {data.map((data, index) => (
                        <div key={index} className='grid gap-3 p-5 max-sm:p-5 w-auto border-2 rounded-xl grid-flow-row'>
                            <h1 className='text-2xl font-medium text-blue-700 text-center'>{data.title}</h1>
                            <h1 className='text-lg font-medium text-blue-700 flex items-center gap-2'><CgNametag /> Name: <span className='text-black'>{data.name}</span></h1>
                            <h1 className='text-lg font-medium text-blue-700 flex items-center gap-2'><MdScore /> Overall band score: <span className='text-black'>{data.score}</span></h1>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg font-medium text-blue-700 flex items-center gap-2'><TiTime /> Within: <span className='text-black'>{data.time} {data.time > 1 ? "months" : "month"}</span></h1>
                                <a href={data.link} className='text-sm text-gray-500 flex items-center gap-2'>Details <BsArrowRight /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Results