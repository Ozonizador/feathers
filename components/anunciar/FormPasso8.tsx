import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import Checkbox from "../utils/Checkbox";

interface FormTermos {
  termos: boolean;
  politica: boolean;
  calendarUpdated: boolean;
  trustInformation: boolean;
}

const FormPasso8 = () => {
  const { control, handleSubmit } = useForm<FormTermos>({
    defaultValues: { termos: false, politica: false, calendarUpdated: true, trustInformation: true },
  });
  const advertisement = useAdvertisement();
  const router = useRouter();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextSteps = async (data) => {
    debugger;
    // setAdvertisementProperty("aboutHouse", "testing");
    const { error } = await updateAdvertisement(advertisement, advertisement.id);
    if (!error) {
      toast.success("Registo Bem Sucedido");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(nextSteps)}>
      <section className="container mx-auto my-20 w-5/6">
        <div className="mb-10 text-2xl font-bold text-gray-700">
          Está quase pronto! Leia e aceite os seguintes documentos.
        </div>

        <div className="mt-20 flex flex-col gap-5">
          <div className="flex flex-row items-center align-middle">
            <div className="flex flex-row items-center gap-4">
              <Controller
                control={control}
                name={"termos"}
                render={({ field: { onChange, value } }) => {
                  return <Checkbox onChange={onChange} name="termos" checked={value} />;
                }}
                rules={{ validate: (value) => value === true }}
              ></Controller>
              <div className="text-xl">Termos e condições</div>{" "}
            </div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div className="flex flex-row items-center gap-4">
              <Controller
                control={control}
                name={"politica"}
                render={({ field: { onChange, value } }) => {
                  return <Checkbox onChange={onChange} name="politica" checked={value} />;
                }}
                rules={{ validate: (value) => value === true }}
              ></Controller>

              <div className="text-xl">Política de privacidade</div>
            </div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div className="flex flex-row items-center gap-4">
              <Controller
                control={control}
                name={"calendarUpdated"}
                render={({ field: { onChange, value } }) => {
                  return <Checkbox onChange={onChange} name="calendarUpdated" checked={value} />;
                }}
                rules={{ validate: (value) => value === true || "error" }}
              ></Controller>
              <div className="text-xl">Acordo em manter o meu calendário atualizado</div>{" "}
            </div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div className="flex flex-row items-center gap-4">
              <Controller
                control={control}
                name={"trustInformation"}
                render={({ field: { onChange, value } }) => {
                  return <Checkbox onChange={onChange} name="trustInformation" checked={value} />;
                }}
                rules={{ validate: (value) => value === true }}
              ></Controller>

              <div className="text-xl">As informações que providencio são verdadeiras</div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
          onClick={(e) => nextSteps(e)}
        >
          Gravar anúncio
        </button>
      </section>
    </form>
  );
};

export default FormPasso8;
