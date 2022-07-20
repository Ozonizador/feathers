
import { Avatar } from 'flowbite-react'
const MensagemEnviada = () => {
    return (
        <>

            <div className='flex-col mt-4 ml-2'>
                <div className=' flex flex-row w-full align-middle items-center'>
                    <div className='w-16 flex flex-col justify-center align-middle items-center'>
                        <Avatar
                            alt="Hóspede"
                            img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            rounded={true}
                            size="md"
                        />
                    </div>
                    <div className='flex flex-row  text-xs justify-between w-full'>
                        <div>Victor Roberts</div>
                        <div>9:52</div>
                    </div>

                </div>

                <div className='ml-4 mt-2 p-4 bg-primary-500 text-white rounded-md text-xs'>Hi Justin! We just wanted to welcome you to our team.</div>
            </div>


        </>
    )
}

export default MensagemEnviada