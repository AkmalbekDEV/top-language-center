import React from 'react'
import { useTranslation } from 'react-i18next'
import TypewriterComponent from 'typewriter-effect'

const Hero = () => {
    const [t, i18n] = useTranslation("global")

    return (
        <section id='home' className='flex items-center justify-center mt-44 max-sm:mb-[250px]'>
            <div className='h-[150px] max-sm:h-0'>
                <h1 className='text-blue-800 font-bold text-7xl font-mono text-center'>
                    <TypewriterComponent
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 40,
                            strings: [
                                `Top Language Center`,
                                `Together To The Top!`,
                            ],
                        }}
                    />
                </h1>
            </div>
        </section>
    )
}

export default Hero