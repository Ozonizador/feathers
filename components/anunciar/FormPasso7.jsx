import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Input from "../utils/Input";



const FormPasso7 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto w-5/6 my-20">
      <div className="text-2xl text-gray-700 font-bold mb-28">
        Vamos a valores!
      </div>



      <div className="flex flex-col">
        <div className="flex items-center align-middle">
          <p className="font-bold text-base w-60">Valor Mensal</p>
          <div className=" flex flex-row items-center ml-6">
            <div className="text-base  w-full"><Input label="" labelText="" customCss="euro" /></div>
            <div className="ml-2 font-bold text-base">/mês</div>
          </div>
        </div>


        <div className="flex items-center align-middle">
          <p className="font-bold text-base w-60">Preço por pessoa extra</p>
          <div className=" flex flex-row items-center ml-6">
            <div className="text-base  w-full"><Input label="" labelText="" customCss="euro" /></div>
            <div className="ml-2 font-bold text-base">/mês</div>
          </div>
        </div>


        <div className="flex items-center align-middle">
          <p className="font-bold text-base w-60">Caução</p>
          <div className=" flex flex-row items-center ml-6 ">
            <div className="text-base  w-full"><Input label="" labelText="" customCss="euro" /></div>

          </div>
        </div>


        <div className="flex flex-col  mt-20">
          <div className="flex flex-row items-center align-middle my-5">
            <div>
              <input type="radio" />
            </div>
            <div className="ml-4 font-bold text-xl">Despesas incluídas</div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div>
              <input type="radio" />
            </div>
            <div className="ml-4 font-bold text-xl">Despesas parcialmente incluídas</div>
          </div>


          <div className="flex items-center my-8 mt-20">
            <div className="flex items-center">

              <p className="font-bold text-base w-24">Gás</p>
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

          <div className="flex items-center my-8 mt-4">
            <div className="flex items-center">

              <p className="font-bold text-base w-24">Internet</p>
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

          <div className="flex items-center my-8 mt-4">
            <div className="flex items-center">

              <p className="font-bold text-base w-24">Agua</p>
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


          <div className="flex items-center my-8 mt-4">
            <div className="flex items-center">

              <p className="font-bold text-base w-24">Luz</p>
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

          <div className="flex flex-row items-center align-middle mt-8">
            <div>
              <input type="radio" />
            </div>
            <div className="ml-4 font-bold text-xl">Despesas excluídas</div>
          </div>
        </div>
      </div>



      <button
        type="button"
        className="mt-16 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso7;
