import React from 'react'
import { Avatar } from 'flowbite-react'
import Link from "next/link"



const HospedesCards = () => {
    return (
        <section>
            <div className='bg-white rounded-md flex py-6 pr-14 mt-5'>
                <div className='w-36 flex flex-col justify-center align-middle items-center'>
                    <Avatar
                        alt="Hóspede"
                        img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        rounded={true}
                        size="lg"
                    />
                    <div className='mt-2 font-bold'>João</div>
                </div>

                <div>
                    <h1 className='font-bold text-xl'>A hospedar em</h1>
                    <h2 className='text-base text-secondary-500 mt-2 mb-6'>Quarto privado em Coimbra</h2>
                    <Link href="/">
                        <a>
                            <p className='text-base text-primary-500 font-normal'>+ informações</p>
                        </a>
                    </Link>
                </div>
            </div>

            <div className='bg-white rounded-md flex py-6 pr-14 mt-5'>
                <div className='w-36 flex flex-col justify-center align-middle items-center'>
                    <Avatar
                        alt="Hóspede"
                        img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        rounded={true}
                        size="lg"
                    />
                    <div className='mt-2 font-bold'>João</div>
                </div>

                <div>
                    <h1 className='font-bold text-xl'>A hospedar em</h1>
                    <h2 className='text-base text-secondary-500 mt-2 mb-6'>Quarto privado em Coimbra</h2>
                    <Link href="/">
                        <a>
                            <p className='text-base text-primary-500 font-normal'>+ informações</p>
                        </a>
                    </Link>
                </div>
            </div>


            <h2 className='text-xl text-secondary-500 mt-14 mb-6'>Hóspedes Anteriores</h2>

            <div className='bg-white rounded-md flex py-6 pr-14 mt-5'>
                <div className='w-36 flex flex-col justify-center align-middle items-center'>
                    <Avatar
                        alt="Hóspede"
                        img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        rounded={true}
                        size="lg"
                    />
                    <div className='mt-2 font-bold'>João</div>
                </div>

                <div>
                    <h1 className='font-bold text-xl'>A hospedar em</h1>
                    <h2 className='text-base text-secondary-500 mt-2 mb-6'>Quarto privado em Coimbra</h2>
                    <Link href="/">
                        <a>
                            <p className='text-base text-primary-500 font-normal'>+ informações</p>
                        </a>
                    </Link>
                </div>
            </div>

            <div className='bg-white rounded-md flex py-6 pr-14 mt-5'>
                <div className='w-36 flex flex-col justify-center align-middle items-center'>
                    <Avatar
                        alt="Hóspede"
                        img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        rounded={true}
                        size="lg"
                    />
                    <div className='mt-2 font-bold'>João</div>
                </div>

                <div>
                    <h1 className='font-bold text-xl'>A hospedar em</h1>
                    <h2 className='text-base text-secondary-500 mt-2 mb-6'>Quarto privado em Coimbra</h2>
                    <Link href="/">
                        <a>
                            <p className='text-base text-primary-500 font-normal'>+ informações</p>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HospedesCards