import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAdvertisement, useImageFiles, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useDecrementStep } from "../../context/AnunciarProvider";
import useAdvertisementService from "../../hooks/advertisementService";
import { AdvertisementInfo, AdvertisementPhoto, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import { HOME_URL } from "../../models/paths";
import Button from "../utils/Button";
import Checkbox from "../utils/Checkbox";
import FeathersSpinner from "../utils/Spinner";

const FormTermos = () => {
  const router = useRouter();
  const decrementStep = useDecrementStep();
  const [saving, setSaving] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AdvertisementInfo>({
    defaultValues: { terms: false, politica: false, calendarUpdated: false, trustInformation: false },
  });
  const advertisement = useAdvertisement();

  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { addAdvertisement, saveImage } = useAdvertisementService();
  const { files } = useImageFiles();

  const onSubmit = async ({ terms, politica, trustInformation, calendarUpdated }: AdvertisementInfo) => {
    try {
      setSaving(true);
      if (!isValid) return;

      // saving images
      await saveImages();

      // adding advertisements
      const { error } = await addAdvertisement({
        ...advertisement,
        agreementsinfo: { terms, politica, trustInformation, calendarUpdated },
      });
      if (error) return toast.error(error.message);

      toast.success("Registo Bem Sucedido");
      router.push(HOME_URL);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const saveImages = async () => {
    const paths = [] as AdvertisementPhoto[];
    for (let image of files) {
      const { data } = await saveImage(advertisement.id, image.name, image);
      if (data) {
        paths.push({ url: data.publicUrl, zone: "other" });
      }
    }
    setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.PHOTOS, paths);
  };

  return (
    <>
      {!saving ? (
        <form className="container mx-auto my-20 lg:w-5/6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 text-2xl font-bold text-gray-700">
            Está quase pronto! Leia e aceite os seguintes documentos.
          </div>

          <div className="mt-20 flex flex-col gap-5">
            <div className="flex flex-row items-center align-middle">
              <div className="flex flex-row items-center gap-4">
                <Controller
                  control={control}
                  name={"terms"}
                  render={({ field: { onChange, value } }) => {
                    return <Checkbox onChange={onChange} name="termos" checked={value} />;
                  }}
                  rules={{ validate: (value) => value === true || "error" }}
                ></Controller>
                <div className="text-xl">Termos e condições</div>
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
                  rules={{ validate: (value) => value === true || "error" }}
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
                  rules={{ validate: (value) => value === true || "error" }}
                ></Controller>

                <div className="text-xl">As informações que providencio são verdadeiras</div>
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-col justify-center gap-5 lg:flex-row lg:px-32">
            <div className="mx-auto w-5/6 lg:w-2/3">
              <Button onClick={(e) => decrementStep()} type="button">
                Voltar Atrás
              </Button>
            </div>
            <div className="mx-auto w-5/6 lg:w-2/3">
              <Button type="submit" disabled={!isValid}>
                <span className="uppercase leading-tight">Gravar Anúncio</span>
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <FeathersSpinner />
        </div>
      )}
    </>
  );
};

export default FormTermos;
