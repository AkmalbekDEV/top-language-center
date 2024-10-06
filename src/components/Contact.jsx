import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const Contact = () => {
    const [number, setNumber] = useState("")
    const toast = useToast()

    const handleData = (e) => {
        e.preventDefault()

        if (number.length < 9) {
            toast({
                duration: 5000,
                isClosable: true,
                status: 'error',
                title: "The number is invaild",
                description: "The number you entered is invaild"
            })
            return;
        } else if (number.length > 17) {
            toast({
                duration: 5000,
                isClosable: true,
                status: 'error',
                title: "The number is invaild",
                description: "The number you entered is invaild"
            })
            return;
        } else (
            toast({
                duration: 5000,
                isClosable: true,
                status: 'success',
                title: "Your number is successfully submitted!",
                description: "Our administrators will contact you soon!"
            })
        )

        const token = "6584768873:AAFzT7T-PPsZIsSKEDtksmqjRq5LwP4ggVI"
        const chat_id = "-4211448177"
        const my_text = `
            NEW STUDENT ‼️
                📲 Number: ${number},
                🎛 Wanted: Get information about courses.
        `;
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(my_text)}`

        axios.get(url)
            .then((response) => {
                console.log('Message sent', response.data);
            })
            .catch((error) => {
                console.error('Error sending message', error);
            });

        setNumber("")
        setErrorMsg("")
    }

    return (
        <div className='flex items-center justify-center bg-[#06052e] h-[500px] max-sm:h-[400px] rounded-3xl mt-20 px-32 max-sm:px-0 max-sm:mx-5'>
            <div className='grid gap-7 max-sm:gap-4'>
                <h1 className='text-white text-5xl font-semibold text-center  max-sm:text-2xl max-sm:mx-5'>Contact the administrator and get information about the courses</h1>
                <h1 className='text-gray-500 text-2xl font-normal text-center max-sm:text-xl max-sm:px-5'>Enter your number!</h1>
                <div className='flex justify-center'>
                    <form onSubmit={handleData} className='w-[70%] flex  items-center gap-5 max-sm:gap-1 rounded-2xl bg-white'>
                        <input onChange={(e) => setNumber(e.target.value)} value={number} name='number' type="text" placeholder="Your number..." className='w-[70%] max-sm:w-[65%] h-[60px] pl-5 text-lg text-black rounded-l-xl rounded-bl-xl outline-none' />
                        <button className='w-[25%] max-sm:w-[30%] h-[40px] rounded-xl bg-blue-700 text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact