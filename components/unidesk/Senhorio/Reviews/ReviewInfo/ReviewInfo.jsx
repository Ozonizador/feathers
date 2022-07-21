
import Link from "next/link"
import { Rating } from "flowbite-react/lib/esm/components";
import { Avatar } from "flowbite-react";




const ReviewInfo = () => {
    return (
        <>
            <div>
                <h1 className='font-semibold text-3xl mb-7'>Reviews</h1>
                <p className='text-xl text-slate-400 mb-6'>Os meus Anúncios</p>
            </div>

            <div className='flex flex-row items-center '>
                <div className='h-36 w-60 bg-white flex justify-center align-middle items-center flex-col  border border-terciary-500 rounded-lg'>
                    <h1 className='mb-7 font-bold text-xl'>Classificação geral</h1>
                    <Rating>
                        <Rating.Star />
                        {/* <Rating.Star filled={false} /> */}
                        <p className="ml-2 text-xl  text-yellow-300">
                            4.95
                        </p>
                    </Rating>
                </div>

                <div className='font-bold text-xl ml-7'>Taxa de resposta: 80%</div>
            </div>


            <div className="flex flex-row mt-14 mb-6 items-center align-middle gap-5">
                <div>
                    <Link href="/">
                        <a href="" className="font-bold text-xl">Últimas reviews</a>
                    </Link>
                </div>

                <div>
                    <Link href="/">
                        <a href="" className="text-secondary-300">Anúncios</a>
                    </Link>
                </div>
            </div>


            {/* CARD */}
            <div className='bg-white flex flex-row p-7 gap-10 items-center mb-5'>
                <div className='flex flex-col w-60 justify-center align-middle items-center'>
                    <Avatar
                        alt="Default avatar with alt text"
                        img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        rounded={true}
                        size="lg"
                    />
                    <div className='font-bold text-base'>Rosa</div>
                </div>
                <div className='text-secondary-500 text-base'>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque

                    <div className='flex flex-row justify-end text-primary-500 text-base mt-2'>
                        Agosto 2021
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewInfo