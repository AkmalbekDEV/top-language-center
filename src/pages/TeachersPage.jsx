import { useConst } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useTranslation } from 'react-i18next'
import Begov from '../assets/begov.jpg'

const TeachersPage = () => {
    const [t, i18n] = useTranslation("global")

    return (
        <div className='max-w-[1250px] mx-auto'>
            <div className='mt-36 grid gap-10 max-sm:px-5'>
                <div className='flex max-sm:flex-col gap-12 max-sm:gap-5 items-center px-8 py-5 max-sm:px-5 max-sm:py-'>
                    <img src={Begov} className='w-[40%] max-sm:w-full rounded-2xl' alt="" />
                    <div className='grid content-between h-[95%] max-sm:gap-5 max-sm:text-center'>
                        <h1 className='text-4xl font-bold'>{t("teachers.name")}</h1>
                        <p className='text-lg font-medium text-gray-500'>
                            Men 2018 yil avgust oyida Xitoyning Shanghai shahrida joylashgan CTP Teaching Centre o'quv markazida ilk ish faoliyatimni boshlaganman va 2020 yil yanvarigacha u yerda ishlaganman. <div className='my-2'></div> Keyin esa O'zbekistonga qaytib, Urganch shahrida o'z o'quv kurslarimni ochdim va shu paytgacha 3000 dan ortiq o'quvchiga dars berib ularni yaxshi natijalarga erishishida yordam berib kelmoqdaman. <div className='my-2'></div> Bizning kurslarimizda zamonaviy o'qitish uslublari qo'llaniladi va har bir talabaning individual ehtiyojlariga e'tibor qaratiladi. O'quvchilarimiz qisqa vaqt ichida sezilarli natijalarga erishishadi va ingliz tilini erkin suhbatlashish darajasida o'rganishadi.
                        </p>
                        <button className='px-10 py-3 max-sm:w-full hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-900 rounded-xl w-fit bg-blue-700 text-lg font-medium text-white'>{t("teachers.btn")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeachersPage