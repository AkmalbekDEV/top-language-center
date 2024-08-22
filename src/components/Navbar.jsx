import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuItem, Button, useDisclosure } from '@chakra-ui/react'
import { BsArrowDown } from 'react-icons/bs'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'
import { FaTimes } from 'react-icons/fa'
import { CiMenuFries } from 'react-icons/ci'
import { BiMenu } from 'react-icons/bi'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

const Navbar = () => {
  const [t, i18n] = useTranslation("global")
  const [click, setClick] = useState(false)
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const location = useLocation()

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  };

  const handleClick1 = () => {
    navigate('/results')
  }

  const handleClick2 = () => {
    navigate('/self-study')
  }

  useEffect(() => {
    onClose();
  }, [location.pathname])

  return (
    <section className='shadow-md fixed w-full top-0 left-0 z-50 bg-white'>
      <div className='max-w-[1250px] mx-auto'>
        <div className='flex justify-between items-center w-full max-sm:px-5'>
          <div onClick={() => navigate('/')} className='flex items-center max-sm:gap-3 gap-5 cursor-pointer'>
            <img src={Logo} alt="" className='w-[80px] max-sm:w-[65px] rounded-[50%] my-5 cursor-pointer' />
            <div>
              <h1 className='font-bold tracking-wide text-blue-800 text-lg max-sm:text-base'>TOP LANGUAGE CENTER</h1>
              <h1 className='tracking-wide text-blue-800 text-sm'>OFFICIAL WEBSITE</h1>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <button onClick={() => navigate('/results')} className='px-5  max-sm:hidden py-2 rounded-xl text-blue-700 border-2 font-medium hover:text-white hover:bg-blue-700 transition-all border-blue-700'>Latest high results</button>
            <button onClick={() => navigate('/self-study')} className='px-5  max-sm:hidden py-2 rounded-xl text-blue-700 border-2 font-medium hover:text-white hover:bg-blue-700 transition-all border-blue-700'>For Self-Study</button>
          </div>
          <BiMenu className='hidden max-sm:block cursor-pointer' size={35} onClick={onOpen} />
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bgColor={'#1A237E'}>
              <DrawerCloseButton color='white' />
              <DrawerHeader textColor={'white'}>Menu</DrawerHeader>
              <DrawerBody>
                <div onClick={handleClick1} className='rounded-xl bg-none flex items-center justify-center w-full py-4 hover:bg-[#ffffff20] cursor-pointer transition-all text-white text-xl font-medium'>Latest high results</div>
                <div onClick={handleClick2} className='rounded-xl bg-none flex items-center justify-center w-full py-4 hover:bg-[#ffffff20] cursor-pointer transition-all text-white text-xl font-medium'>For Self-study</div>
              </DrawerBody>
              <DrawerFooter textColor={'white'} fontWeight={'medium'}>
                TOP LANGUAGE CENTER
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>
  )
}

export default Navbar