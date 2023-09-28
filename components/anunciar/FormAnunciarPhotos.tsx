import { Trans, useTranslation } from "next-i18next";
import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import Image from "next/image";
import { useAdvertisement, useImageFiles, useSetAdvertisement, useSetImageFiles } from "../../context/AdvertisementController";
import { toast } from "react-toastify";
import Button from "../utils/Button";
import { HouseZones } from "../../models/advertisement";

const FormAnunciarPhotos = () => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  const { files, filesUrl } = useImageFiles();
  const setImagesInfo = useSetImageFiles();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (files.length < 5) return toast.error(t("messages:errors.minimum_5_images"));
    
    const newAdvertisementPhotos: { url: string; zone: HouseZones; }[] = []
    files.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "other"});
    });

    advertisement.photos =  newAdvertisementPhotos;
    setAdvertisement(advertisement);

    incrementStep();
  };

  const uploadToClient = (event: any) => {
    event.preventDefault();
    if (event.target.files) {
      let newFiles = [];
      for (let file of event.target.files) {
        newFiles.push(file);
      }

      const newFilesUrl = newFiles.map((file) => URL.createObjectURL(file));
      setImagesInfo({
        files: [files, ...newFiles].flat(),
        filesUrl: [filesUrl, ...newFilesUrl].flat(),
      });
    }
  };

  const removeImageFromSelection = (index: number) => {
    const currentImages = [...files];
    const currentObjectUrls = [...filesUrl];
    currentImages.splice(index, 1);
    currentObjectUrls.splice(index, 1);

    // save
    setImagesInfo({ files: currentImages, filesUrl: currentObjectUrls });
  };

  return (
    <section className="container mx-auto my-10 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-4 block text-center text-xl  font-bold text-gray-700 lg:text-left lg:text-2xl">
          <Trans i18nKey="advertisements:add_advert.photos_title" components={{ 1: <br /> }} />
        </div>

        <div>
          <div className="mt-10 flex justify-center rounded-md border-2 border-dashed border-terciary-500 py-28">
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
                    {t("advertisements:add_advert.add_photo")} <span className="text-blue-500">Download</span>
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
            <div className="relative h-28 w-full lg:h-28 lg:w-28" key={index}>
              <div
                className="absolute right-1 top-1 z-50 rounded-xl border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index)}
              >
                x
              </div>
              <Image src={object} className="h-28 w-28" fill style={{ objectFit: "cover" }} alt="advert-image" />
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex  justify-center gap-5 lg:px-32">
        <div className="w-48">
          <Button onClick={decrementStep} type="button">
            {t("go_back")}
          </Button>
        </div>
        <div className="w-48">
          <Button onClick={nextStep} type="button">
            {t("next_step")} &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormAnunciarPhotos;
