import React from 'react'
import { Avatar } from 'flowbite-react'
const CaixaCard = () => {
  return (
    <>
      <div className='bg-white flex py-2 mb-2'>
        <div className='w-20 flex flex-col justify-center align-middle items-center'>
          <Avatar
            alt="Hóspede"
            img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            rounded={true}
            size="md"
          />
          <div className='mt-2 font-bold text-xs'>João</div>
        </div>

        <div className='ml-1'>
          <div className='flex flex-row justify-between'>
            <h1 className='font-bold text-base text-green-500'>Reserva Confirmada</h1>
            <p className='text-xs'>16:45</p>
          </div>
          <h2 className='text-xs text-secondary-500 mt-2 mb-2'>Sed ut perspiciatis unde omnis iste natus error sit volup tatem</h2>

          <a>
            <p className='text-xs text-secondary-400 font-normal'>Nome do anuncio</p>
          </a>

        </div>
      </div>
    </>
  )
}

export default CaixaCard