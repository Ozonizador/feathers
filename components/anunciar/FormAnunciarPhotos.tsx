import { Trans, useTranslation } from "next-i18next";
import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useImageFiles,
  useSetAdvertisement,
  useSetImageFiles,
} from "../../context/AdvertisementController";
import { toast } from "react-toastify";
import Button from "../utils/Button";
import { HouseZones } from "../../models/advertisement";
import React, { useEffect, useState } from "react";

const FormAnunciarPhotos = () => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const { files, filesUrl } = useImageFiles();
  const setImagesInfo = useSetImageFiles();

  const [coverImages, setCoverImages] = useState<File[]>([]);
  const [otherImages, setOtherImages] = useState<File[]>([]);

  useEffect(() => {
    if (coverImages.length == 0 && otherImages.length == 0) {
      files.map((file, index) => {
        if (index == 0) {
          coverImages.push(file);
        } else {
          otherImages.push(file);
        }
      });
    }
  }, [coverImages, otherImages, files]);

  // Code to remove from one array and move to another
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, container: HouseZones) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    const imageName = event.dataTransfer.getData("id");

    const newFiles: File[] = [];

    for (let file of files) {
      const blob = file.slice(0, file.size, "image/png");
      newFiles.push(new File([blob], imageName));
    }

    switch (container) {
      case "main":
        setCoverImages(newFiles);
        removeFromArrays(container, newFiles);
        break;
      case "other":
        setOtherImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
    }
  };

  const removeFromArrays = (target: string, files: File[]) => {
    if (target != "main") {
      setCoverImages((prevImages) => prevImages.filter((img) => !files.some((file) => file.name === img.name)));
    }

    if (target != "other") {
      setOtherImages((prevImages) => prevImages.filter((img) => !files.some((file) => file.name === img.name)));

      if (otherImages.length == 1) {
        setOtherImages([]);
      }
    }
  };

  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newAdvertisementPhotos: { url: string; zone: HouseZones }[] = [];
    coverImages.forEach((file) => {
      newAdvertisementPhotos.push({ url: URL.createObjectURL(file), zone: "main" });
    });

    otherImages.forEach((file) => {
      newAdvertisementPhotos.push({ url: URL.createObjectURL(file), zone: "other" });
    });

    if (newAdvertisementPhotos.length < 5) return toast.error(t("messages:errors.minimum_5_images"));

    advertisement.photos = newAdvertisementPhotos;
    setAdvertisement(advertisement);

    incrementStep();
  };

  const uploadToClient = async (event: any) => {
    event.preventDefault();
    if (event.target.files) {
      let newFiles: any[] = [];
      for (let file of event.target.files) {
        if (file.size < 2097152) {
          if (newFiles.find((element) => element.name == file.name)) {
            file.name = file.name + newFiles.length.toString();
          }
          newFiles.push(file);
        } else {
          toast.error(t("common.file-size", {name: file.name}));
          break;
        }
      }

      const newFilesUrl = newFiles.map((file) => URL.createObjectURL(file));
      setImagesInfo({ files: [files, ...newFiles].flat(), filesUrl: [filesUrl, ...newFilesUrl].flat() });
      setOtherImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const removeImageFromSelection = (index: number, origin: any, arrayName: string) => {
    const currentImages = [...origin];
    currentImages.splice(index, 1);

    switch (arrayName) {
      case "main":
        setCoverImages(currentImages);
      case "other":
        setOtherImages(currentImages);
    }
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
        <section className="flex">
          <div
            className="drop-container w-1/4 pr-2"
            onDrop={(event) => handleDrop(event, "main")}
            onDragOver={(event) => event.preventDefault()}
          >
            <h2>{t("advertisements:cover")}</h2>
            {coverImages.map((file, index) => (
              <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
                <div
                  className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                  onClick={(e) => removeImageFromSelection(index, coverImages, "main")}
                >
                  x
                </div>
                <img className="image" src={URL.createObjectURL(file)} alt={`Image ${index}`} id={`${file.name}`} />
              </div>
            ))}
          </div>
          <div
            className="drop-container w-3/4"
            onDrop={(event) => handleDrop(event, "other")}
            onDragOver={(event) => event.preventDefault()}
          >
            <h2>{t("advertisements:zones:other")}</h2>
            <div className="flex flex-wrap">
              {otherImages.map((file, index) => (
                <div className="image-box relative h-28 w-1/3  pr-2 pt-2 lg:h-28" key={index}>
                  <div
                    className="absolute right-3 top-3 z-50 flex h-5 w-5 items-center justify-center rounded-full border border-primary-500 bg-primary-500 font-bold text-white"
                    onClick={(e) => removeImageFromSelection(index, otherImages, "other")}
                  >
                    x
                  </div>
                  <img
                    className="image h-full w-full"
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    id={`${file.name}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-5 lg:px-32 xl:flex-row">
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
