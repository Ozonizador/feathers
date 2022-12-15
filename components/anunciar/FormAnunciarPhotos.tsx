import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import Image from "next/image";
import { useImageFiles, useSetImageFiles } from "../../context/AdvertisementController";
import { toast } from "react-toastify";
import Button from "../utils/Button";

const FormAnunciarPhotos = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const { files, filesUrl } = useImageFiles();
  const setImagesInfo = useSetImageFiles();

  const nextStep = async (e) => {
    e.preventDefault();
    if (files.length < 5) return toast.error("Introduza pelo menos 5 imagens");
    incrementStep();
  };

  const uploadToClient = (event) => {
    event.preventDefault();
    if (event.target.files.length < 5) {
      return;
    }
    if (event.target.files) {
      let files = [];
      for (let file of event.target.files) {
        files.push(file);
      }

      setImagesInfo({ files, filesUrl: files.map((file) => URL.createObjectURL(file)) });
    }
  };

  const removeImageFromSelection = (index) => {
    const currentImages = [...files];
    const currentObjectUrls = [...filesUrl];
    currentImages.splice(index, 1);
    currentObjectUrls.splice(index, 1);

    // save
    setImagesInfo({ files: currentImages, filesUrl: currentObjectUrls });
  };

  return (
    <section className="container mx-auto  my-20 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-4 block text-center text-xl  font-bold text-gray-700 lg:text-left lg:text-2xl">
          Carregue fotos para o seu anúncio ser mais apelativo e o estudante saber exatamente o que esperar.
          <br />
          (mín. 5 fotos)
        </div>

        <div>
          <div className=" mt-10 flex justify-center rounded-md border-2 border-dashed border-terciary-500 py-28">
            <div className="space-y-1 text-center">
              <div className="flex text-terciary-700">
                <label htmlFor="files" className="relative cursor-pointer rounded-md bg-white text-indigo-500">
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
      <div className="mt-3 flex flex-1 flex-wrap gap-1">
        {filesUrl.map((object, index) => {
          return (
            <div className="relative" key={index}>
              <div
                className="absolute right-1 top-1 z-50 rounded-xl border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index)}
              >
                x
              </div>
              <Image src={object} height={116} width={116} alt="advert-image" />
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Button onClick={(e) => decrementStep()} type="button">
            Voltar Atrás
          </Button>
        </div>
        <div className="w-1/2">
          <Button onClick={nextStep} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormAnunciarPhotos;
