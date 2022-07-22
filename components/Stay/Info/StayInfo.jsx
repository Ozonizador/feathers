import Reportar from "../../../public/images/icon-flag.png"
import Image from "next/image";
import { BsFlag } from "react-icons/bs"
import { RiMailSendLine } from "react-icons/ri"
import { TbRefresh } from "react-icons/tb"
import { AiOutlineStar } from "react-icons/ai"

const StayInfo = () => {
    return (
        <div>
            <div className="flex flex-row w-96 gap-4 ml-8">

                <div className="flex flex-col items-center flex-1">
                    <div>
                        <BsFlag className="text-4xl text-red-500 mb-2" />

                    </div>
                    <div className="text-xs text-center">Reportar<br />anúncio</div>
                </div>


                <div className="flex flex-col items-center flex-1">
                    <div>
                        <RiMailSendLine className="text-4xl text-green-400 mb-2" />

                    </div>
                    <div className="text-xs text-center">Enviar<br />mensagem</div>
                </div>

                <div className="flex flex-col items-center flex-1">
                    <div>
                        <TbRefresh className="text-4xl text-amber-700 mb-2" />

                    </div>
                    <div className="text-xs text-center">Alterar<br />reserva</div>
                </div>

                <div className="flex flex-col items-center flex-1">
                    <div>
                        <AiOutlineStar className="text-4xl text-yellow-400 mb-2" />

                    </div>
                    <div className="text-xs text-center">Avaliar<br />experiência</div>
                </div>


            </div>


        </div>
    )
}

export default StayInfo