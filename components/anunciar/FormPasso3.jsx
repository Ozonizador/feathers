import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { ADVERTISEMENT_PROPERTIES, HOST_TYPE } from "../../models/advertisement";
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
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full">
        <label className="mb-4 block text-2xl font-bold text-gray-700">Título do Anúncio</label>
        <input
          className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
          placeholder="Máximo de 50 palavras"
          maxLength={50}
          onChange={(e) =>
            changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.TITLE, e.target.value)
          }
        />

        <div className="mt-12">
          <label htmlFor="about" className="text-2xl font-bold text-gray-700">
            Descreva o seu espaço de forma simples e concisa.
          </label>
          <div className="mt-4">
            <textarea
              rows={5}
              className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
              placeholder="Descreva o seu espaço em 500 palavras"
              maxLength={500}
              defaultValue={""}
              onChange={(e) =>
                changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.DESCRIPTION, e.target.value)
              }
            />
          </div>
        </div>

        {/* missing here */}
        <div className="mt-24 flex items-center">
          <div className="flex">
            <p className="w-40 text-base font-bold">Vive na propriedade?</p>{" "}
          </div>
          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Sim</div>

            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_lives_apartment"
                  type="radio"
                  value={true}
                  className=" h-4 w-4 rounded border border-terciary-500"
                />
              </div>
            </div>
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Não</div>

            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_lives_apartment"
                  type="radio"
                  value={false}
                  className=" h-4 w-4 rounded border border-terciary-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex">
            <p className="w-40 text-base font-bold">Tipo de senhorio</p>{" "}
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Particular</div>
            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_type"
                  type="radio"
                  className=" h-4 w-4 rounded border border-terciary-500"
                  value={HOST_TYPE.PARTICULAR}
                />
              </div>
            </div>
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Profissional</div>
            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_type"
                  type="radio"
                  className=" h-4 w-4 rounded border border-terciary-500"
                  value={HOST_TYPE.PROFISSIONAL}
                />
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
