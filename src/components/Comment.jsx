import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'

const Comment = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("uz-UZ")
    const [value, setValue] = useState("")     
    const [name, setName] = useState("")   
    const toast = useToast() 

    const postData = async (data) => {
        try {
            const response = await axios.post('https://fe100a235e57a25f.mokky.dev/reviewsTest', data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (value === "" || name === "") {
            toast({
                duration: 5000,
                isClosable: true,
                status: "error",
                title: "Fill the all inputs!",
                description: "Refill the all inputs and try again!"
            })
            return;
        }

        const data = {
            name: name,
            desc: value,
            date: formattedDate,
        }
        postData(data)
        setName("");
        setValue("")
        toast({
            duration: 5000,
            isClosable: true,
            status: "success",
            title: "Commented!",
            description: "Your comment will be reviewed and posted on the website soon!"
        })
    }

    return (
        <form onSubmit={handleSubmit} className='grid gap-3 mt-10 max-sm:px-5'>
            <h1 className='text-5xl font-medium text-center'>Leave a Comment</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='border-2 rounded-xl text-2xl max-sm:text-lg mt-5 bg-gray-100 resize-none p-5 outline-none' placeholder='Your name...' spellCheck={false} />
            <textarea value={value} onChange={(e) => setValue(e.target.value)} className='border-2 rounded-xl h-44 text-2xl max-sm:text-lg mt-3 bg-gray-100 resize-none p-5 outline-none' placeholder='Leave a comment about us...' spellCheck={false} />
            <div className='text-center mt-5'>
                <button className='w-fit px-8 py-3 rounded-xl bg-blue-600 text-white transition-all hover:shadow-md hover:shadow-blue-600 active:bg-blue-800'>Comment!</button>
            </div>
        </form>
    )
}

export default Comment