import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Movies from './Movies'

const Lessons = () => {
    return (
        <div className='max-w-[1250px] mx-auto'>
            <div className='grid gap-14 mt-44'>
                <h1 className='font-medium text-5xl text-center'>For <span className='text-blue-700'>Self-study</span></h1>
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Tab fontSize={'25px'}>General</Tab>
                        <Tab fontSize={'25px'}>Series</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel marginTop={'5'}>
                            <a href="https://t.me/+TUdaKtA1YVw2MTYy" target='_blank'>Audios and explainations are here</a>
                            <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-5 mt-5'>
                                <Link to={'https://drive.google.com/file/d/1zquYLiVrLJ2JRJRyuYpq5C9ySL7uz7ef/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>Pre-Intermediate English</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1YnZCO9bXSnvn70PIHEeLIMbhzQDrnXLl/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>Intermediate English</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1wEIDnkJKwrvH9StBcI3F4ZvRBJmmhewi/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>Grammar B1</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1twlUYpnTPdBd0HTflaiAqalim9Ob9OYM/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>Grammar B2</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1VBqgnANIUrFk3xiJbukcsJCIy2Z43JR3/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>Grammar For IELTS</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1r41aF6Ry-kqOIADIgFRSKkLGOTxZmF7e/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>MINDSET for IELTS 2 (Intermediate)</h1>
                                </Link>
                                <Link to={'https://drive.google.com/file/d/1EokZZsZWWPwVjCtZoe6Q_qr1PomeI61C/view?usp=drive_link'} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid" alt="" />
                                    <h1 className='text-center text-xl max-sm:text-base mt-5'>MINDSET for IELTS 3 (Upper-Intermediate)</h1>
                                </Link>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-5 mt-5'>
                                {Movies.map((item, index) => (
                                    <Link key={index} to={item.link} className='border-2 p-5 rounded-xl hover:shadow-xl transition-all'>
                                        <img className='rounded-xl' src={item.img} alt="" />
                                        <h1 className='text-center text-xl mt-5'>{item.title}</h1>
                                    </Link>
                                ))}
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default Lessons