import Link from "next/link"

export const NotificationCard = () => {
    return (
        <>
            <div className='w-full rounded-md border border-gray-200 flex flex-row p-4 justify-between items-center mb-5'>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-xl mb-1'>Filipa, boas notícias!</h1>
                    <p className='text-base text-gray-400 '>A senhoria Maria aceitou o teu pedido de reserva!</p>
                </div>

                <div>
                    <Link href=" ">
                        <a className="rounded-full bg-primary-500 py-3 px-11 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                            ir para a caixa de entrada
                        </a>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default NotificationCard;
