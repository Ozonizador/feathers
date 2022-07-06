import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { MdOutlinePets } from "react-icons/md"
import { GiCigarette } from "react-icons/gi"
import { BiDrink } from "react-icons/bi"
import { MdChecklist } from "react-icons/md"
import { GiBroom } from "react-icons/gi"
import Input from "../utils/Input";





const FormPasso5 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto w-5/6 my-20">
      <div className="w-full">





        <div className="text-2xl text-gray-700 font-bold mb-28">
          Falemos agora sobre condições e regras da casa
        </div>

        <div className="flex items-center my-8">
          <div className="flex items-center">
            <div className=""><MdOutlinePets className="text-2xl mr-3" /></div>
            <p className="font-bold text-base w-40">Animais permitidos</p>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Sim
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Não
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>
        </div>


        <div className="flex items-center my-8">
          <div className="flex items-center">
            <div className=""><GiCigarette className="text-2xl mr-3" /></div>
            <p className="font-bold text-base w-40">Fumar permitido</p>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Sim
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Não
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center my-8">
          <div className="flex items-center">
            <div className=""><BiDrink className="text-2xl mr-3" /></div>
            <p className="font-bold text-base w-40">Eventos Permitidos</p>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Sim
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Não
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center ">
          <div className="flex">
            <div><MdChecklist className="text-2xl mr-3" /></div>
            <p className="font-bold text-base w-40">Outra Regra</p>
          </div>
          <div className=" flex flex-row items-center  ml-6 ">
            <div className="text-base  w-3/4">
              <Input label="" labelText="" />
            </div>
            <div>

            </div>
          </div>
        </div>

        <div className="flex items-center my-8">
          <div className="flex items-center">
            <div className=""><GiBroom className="text-2xl mr-3" /></div>
            <p className="font-bold text-base w-40">Limpeza</p>
          </div>

          <div className="w-40 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">

            <div>
              <div className="flex items-center h-5">
                <select className="w-full py-2 px-3 ">
                  <option>Selecione</option>
                  <option>Sim</option>
                  <option>Não</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-20 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>

    </section >
  );
};

export default FormPasso5;
