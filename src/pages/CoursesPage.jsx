import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { BiUser } from 'react-icons/bi'
import { GiPriceTag, GiTeacher } from 'react-icons/gi'
import { BsWatch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CoursesPage = () => {
  const { state } = useContext(ProductContext)
  const navigate = useNavigate()
  const [t, i18n] = useTranslation("global")

  return (
    <div className='max-w-[1250px] mx-auto mt-40'>
      <div className='grid gap-20 max-sm:px-5 max-sm:gap-16'>
        {state.map((product) => {
          if (product.type === "courses") {
            return (
              <Link key={product.id} to={`/item/${product.id}`}>
                <div className='flex max-sm:flex-col items-center justify-between px-10 max-sm:p-5 py-5 rounded-xl shadow-2xl'>
                  <img className='w-[50%] border-2 max-sm:w-full rounded-xl' src={product.img} alt="" />
                  <div className='w-[45%] max-sm:w-full max-sm:mt-5 grid gap-7 content-between'>
                    <h1 className='text-4xl font-bold'>{product.title}</h1>
                    <div className='flex items-center gap-3'>
                      <GiPriceTag size={35} color='blue' />
                      <h1 className='text-2xl font-medium'>{t("coursesPage.price")}: {product.price}</h1>
                    </div>
                    <div className='flex items-center gap-3'>
                      <GiTeacher size={35} color='blue' />
                      <h1 className='text-2xl font-medium'>{t("coursesPage.teacher")}: {product.teacher}</h1>
                    </div>
                    <div className='flex items-center gap-3'>
                      <BsWatch size={35} color='blue' />
                      <h1 onClick={() => navigate('/#contact')} className='text-2xl font-medium'>{t("coursesPage.continuity")}: {product.continuity} {t("coursesPage.time")}</h1>
                    </div>
                  </div>
                </div>  
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
}

export default CoursesPage