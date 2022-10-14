import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../services/advertisementService";

const FormPasso8 = () => {
  const advertisement = useAdvertisement();
  const router = useRouter();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextSteps = async (e) => {
    e.preventDefault();
    // setAdvertisementProperty("aboutHouse", "testing");
    const { data, error } = await updateAdvertisement(advertisement, advertisement.id);
    if (!error) {
      toast.success("Registo Bem Sucedido");
      router.push("/");
    }
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="mb-10 text-2xl font-bold text-gray-700">
        Está quase pronto! Leia e aceite os seguintes documentos.
      </div>

      <div className="mt-20 flex  flex-col">
        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4 text-xl">Termos e condições</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">Política de privacidade</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">Acordo em manter o meu calendário atualizado</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">As informações que providencio são verdadeiras</div>
        </div>
      </div>

      <button
        type="button"
        className="mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
        onClick={(e) => nextSteps(e)}
      >
        Gravar anúncio
      </button>
    </section>
  );
};

export default FormPasso8;
