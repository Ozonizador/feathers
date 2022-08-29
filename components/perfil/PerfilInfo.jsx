import React from 'react'
import Image from "next/image";

const PerfilInfo = () => {
    return (
        <div className='w-full flex flex-col justify-end'>
            <div className='flex flex-row justify-end align-middle items-center'>
                <div>
                    <h2 className='mr-3'>É de Lisboa, Portugal</h2>
                </div>
                <div>
                    <Image src="/images/icon-perfil-pin.png" alt="" height={56} width={56} />
                </div>
            </div>



            <div className='flex flex-row justify-end align-middle items-center my-6'>
                <div>
                    <h2 className='mr-3'>Fala português, inglês e espanhol</h2>
                </div>
                <div>
                    <Image src="/images/icon-perfil-world-pin.png" alt="" height={56} width={56} />
                </div>
            </div>

        </div>
    )
}

export default PerfilInfo