import { useState } from "react";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Image from "next/image";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { saveImage, updateAdvertisement } from "../../services/advertisementService";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";

const FormPasso3 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const [images, setImages] = useState<File[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  const nextStep = async (e) => {
    e.preventDefault();

    await saveImages();
    await updateAdvertisement(advertisement, advertisement.id);

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const uploadToClient = (event) => {
    event.preventDefault();
    if (event.target.files) {
      let files = [];
      for (let file of event.target.files) {
        files.push(file);
      }
      setImages(files);
      setObjectUrls(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImageFromSelection = (index) => {
    const currentImages = [...images];
    const currentObjectUrls = [...objectUrls];
    currentImages.splice(index, 1);
    currentObjectUrls.splice(index, 1);

    // save
    setImages(currentImages);
    setObjectUrls(currentObjectUrls);
  };

  const saveImages = async () => {
    const paths = [] as string[];
    for (let image of images) {
      const { publicURL, error } = await saveImage(advertisement.id, image.name, image);
      if (publicURL) {
        paths.push(publicURL);
      }
    }
    setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.PHOTOS, paths);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full">
        <div className="mb-4 block text-2xl font-bold text-gray-700">
          Carregue fotos para o seu anúncio ser mais apelativo e o estudante saber exatamente o que
          esperar.
          <br />
          (mín. 5 fotos)
        </div>

        <div>
          <div className=" mt-10 flex justify-center rounded-md border-2 border-dashed border-terciary-500 py-28">
            <div className="space-y-1 text-center">
              <div className="flex text-terciary-700">
                <label
                  htmlFor="files"
                  className="relative cursor-pointer rounded-md bg-white text-indigo-500"
                >
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="px-2 text-base text-neutral-600">
                    Adicionar Fotos <span className="text-blue-500">Download</span>
                  </p>
                </label>
                <input
                  type="file"
                  id="files"
                  onChange={uploadToClient}
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FALTA GALERIA DE FOTOS */}
      <div className="mt-3 flex flex-1 flex-wrap">
        {objectUrls.map((object, index) => {
          return (
            <div className="relative mr-2" key={index}>
              <div
                className="absolute right-0 top-0 z-50 rounded-xl border border-red-600 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index)}
              >
                x
              </div>
              <Image src={object} height={128} width={128} alt="advert-image" />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-10 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso3;
