import { AiOutlinePicture } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { BiSmile } from "react-icons/bi";
import { BsFilterCircle } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { Breadcrumb } from "flowbite-react";
import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import CaixaCardPedido from "../../components/CaixaEntrada/CaixaCard/CaixaCardPedido/CaixaCardPedido";
import CaixaCardRecusada from "../../components/CaixaEntrada/CaixaCard/CaixaCardRecusada/CaixaCardRecusada";
import MensagemEnviada from "../../components/CaixaEntrada/MensagemEnviada/MensagemEnviada";
import MensagemRecebida from "../../components/CaixaEntrada/MensagemRecebida/MensagemRecebida";
import { useProfileInformation } from "../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";

{
  /* page 59 XD */
}
const CaixaEntrada = () => {
  const [conversations, setConversations] = useState([]);
  const profile = useProfileInformation();

  const getUserConversations = useCallback(() => {
    const { data, error } = 
    if(!error) {
      setConversations(data)
    }

  }, [])

  useEffect(() => {}, []);

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-16 w-5/6 rounded-2xl border border-terciary-500 ">
        <div className="flex h-20 w-full items-center  justify-between border-b  border-terciary-500 py-6 align-middle">
          <a className=" ml-8 rounded-md bg-primary-500 py-3 px-6 text-white">Mensagens</a>

          <div className="mr-8 flex w-4/5 items-center justify-end align-middle">
            <div>
              <a>
                <GoSearch className="text-xl" />
              </a>
            </div>

            <div>
              <a className="ml-8 flex flex-row items-center justify-center rounded-md bg-primary-500 py-3 px-6 text-white">
                <BsFilterCircle className="mr-2 text-xl" />
                Filter
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <div className="flex w-1/5 flex-col justify-center border-r border-terciary-500 pr-5">
              <div className="p-1">
                <CaixaCard />
                <CaixaCardPedido />
                <CaixaCard />
                <CaixaCard />
                <CaixaCardRecusada />
                <CaixaCard />
                <CaixaCard />
              </div>
            </div>

            <div className="relative flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="w-2/5">
                  <MensagemEnviada />
                </div>
                <div className="w-2/5 pr-4">
                  <MensagemRecebida />
                </div>
              </div>
              <div className=" absolute bottom-5 left-0 flex w-full  flex-row  items-center  justify-between border-t border-terciary-500  pr-4 align-middle">
                <div className="w-10/12">
                  <input
                    className=" mt-5  border-0 text-xs outline-0"
                    placeholder="Type a message..."
                    type="text"
                  />
                </div>

                <div className="mt-5 flex gap-4">
                  <AiOutlinePicture className="text-xl text-slate-400" />
                  <FiPaperclip className="text-xl text-slate-400" />
                  <BiSmile className="text-xl text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaixaEntrada;
