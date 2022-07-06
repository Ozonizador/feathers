import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Input from "../utils/Input";


const FormPasso2 = () => {
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


        <label className="block text-2xl text-gray-700 font-bold mb-4">
          Título do Anúncio
        </label>
        <input className="mt-1 block w-full py-3 px-2 border-solid border border-terciary-500 bg-white rounded-md shadow-sm  mb-6" placeholder="Máximo de 50 palavras" />

        <div className="mt-12">
          <label htmlFor="about" className="text-2xl text-gray-700 font-bold">
            Descreva o seu espaço de forma simples e concisa.
          </label>
          <div className="mt-4">
            <textarea
              rows={5}
              className="mt-1 block w-full py-3 px-2 border-solid border border-terciary-500 bg-white rounded-md shadow-sm  mb-6"
              placeholder="Descreva o seu espaço em 500 palavras"
              defaultValue={''}
            />
          </div>
        </div>


        <div className="flex items-center mt-24">
          <div className="flex">
            <p className="font-bold text-base w-40">Vive na propriedade?</p> </div>
          <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">Sim</div>

            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>

          <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">Não</div>

            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>
        </div>




        <div className="flex items-center my-8">
          <div className="flex">
            <p className="font-bold text-base w-40">Tipo de senhorio</p> </div>

          <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Particular
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
              </div>
            </div>
          </div>

          <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
            <div className="text-base mr-16">
              Profissional
            </div>
            <div>
              <div className="flex items-center h-5">
                <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
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

    </section>

  );
};

export default FormPasso2;
