import { Trans, useTranslation } from "next-i18next";
import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import Image from "next/image";
import { useAdvertisement, useImageFiles, useSetAdvertisement, useSetImageFiles } from "../../context/AdvertisementController";
import { toast } from "react-toastify";
import Button from "../utils/Button";
import { HouseZones } from "../../models/advertisement";
import React, { useState } from 'react';

const FormAnunciarPhotos = () => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  const [coverImages, setCoverImages] = useState<File[]>([]);
  const [bedroomImages, setBedroomImages] = useState<File[]>([]);
  const [bathroomImages, setBathroomImages] = useState<File[]>([]);
  const [livingRoomImages, setLivingRoomImages] = useState<File[]>([]);
  const [kitchenImages, setKitchenImages] = useState<File[]>([]);
  const [otherImages, setOtherImages] = useState<File[]>([]);

  // Code to remove from one array and move to another
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    container: HouseZones,
  ) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    const imageName = event.dataTransfer.getData("id");

    const newFiles: File[] = [];

    for (let file of files) {
      const blob = file.slice(0, file.size, 'image/png'); 
      newFiles.push(new File([blob], imageName));
    }

    switch (container) {
      case "main":
        setCoverImages(newFiles);
        removeFromArrays(container, newFiles);
        break;
      case "bedroom":
        setBedroomImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
      case "bathroom":
        setBathroomImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
      case "livingroom":
        setLivingRoomImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
      case "kitchen":
        setKitchenImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
      case "other":
        setOtherImages((prevImages) => [...prevImages, ...newFiles]);
        removeFromArrays(container, newFiles);
        break;
    }
  }

  const removeFromArrays = (target: string, files: File[]) => {

    if (target != 'main') {
      setCoverImages((prevImages) =>
      prevImages.filter(
        (img) => !files.some((file) => file.name === img.name)
      )
    );
    } 
    
    if (target != 'bedroom') {
      setBedroomImages((prevImages) =>
        prevImages.filter(
          (img) => !files.some((file) => file.name === img.name)
        )
      );
    } 

    if (target != 'bathroom') {
      setBathroomImages((prevImages) =>
        prevImages.filter(
          (img) => !files.some((file) => file.name === img.name)
        )
      );
    } 

    if (target != 'kitchen') {
      setKitchenImages((prevImages) =>
        prevImages.filter(
          (img) => !files.some((file) => file.name === img.name)
        )
      );
    }
    
    if (target != 'livingroom') {
      setLivingRoomImages((prevImages) =>
        prevImages.filter(
          (img) => !files.some((file) => file.name === img.name)
        )
      );
    }

    if (target != 'other') {
      setOtherImages((prevImages) =>
        prevImages.filter(
          (img) => !files.some((file) => file.name === img.name)
        )
      );

      if (otherImages.length == 1) {
        setOtherImages([])
      }
    }
  }

  
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  const { files, filesUrl } = useImageFiles();
  const setImagesInfo = useSetImageFiles();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (files.length < 5) return toast.error(t("messages:errors.minimum_5_images"));
    
    const newAdvertisementPhotos: { url: string; zone: HouseZones; }[] = []
    coverImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "main"});
    });

    bedroomImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "bedroom"});
    });

    bathroomImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "bathroom"});
    });
    
    livingRoomImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "livingroom"});
    });

    kitchenImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "kitchen"});
    })

    otherImages.forEach(file => {
      newAdvertisementPhotos.push({"url": URL.createObjectURL(file), zone: "other"})
    })

    advertisement.photos =  newAdvertisementPhotos;
    setAdvertisement(advertisement);

    incrementStep();
  };

  const uploadToClient = (event: any) => {
    event.preventDefault();
    if (event.target.files) {
      let newFiles: any[] = [];
      for (let file of event.target.files) {
        newFiles.push(file);
      }

      setOtherImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const removeImageFromSelection = (index: number, origin: any, arrayName: string) => {
    const currentImages = [...origin];
    currentImages.splice(index, 1);

    switch(arrayName) {
      case "main":
        setCoverImages(currentImages);
      case "bedroom":
        setBedroomImages(currentImages);
      case "bathroom":
        setBathroomImages(currentImages);
      case "livingroom":
        setLivingRoomImages(currentImages);
      case "kitchen":
        setKitchenImages(currentImages);
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
      <section>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'main', )}
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
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'bedroom')}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("advertisements:zones:bedroom")}</h2>
        {bedroomImages.map((file, index) => (
          <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
            <div
                className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index, bedroomImages, 'bedroom')}
              >
                x
              </div>
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'bathroom')}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("advertisements:zones:bathroom")}</h2>
        {bathroomImages.map((file, index) => (
          <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
            <div
                className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index, bathroomImages , 'bathroom')}
              >
                x
              </div>
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'livingroom')}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("advertisements:zones:livingroom")}</h2>
        {livingRoomImages.map((file, index) => (
          <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
            <div
                className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index, livingRoomImages , 'livingroom')}
              >
                x
              </div>
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'kitchen')}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("advertisements:zones:kitchen")}</h2>
        {kitchenImages.map((file, index) => (
          <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
            <div
                className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index, kitchenImages , 'kitchen')}
              >
                x
              </div>
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      <div
        className="drop-container"
        onDrop={(event) => handleDrop(event, 'other')}
        onDragOver={(event) => event.preventDefault()}
      >
        <h2>{t("advertisements:zones:other")}</h2>
        {otherImages.map((file, index) => (
          <div className="image-box relative h-28 w-full lg:h-28 lg:w-28" key={index}>
            <div
                className="absolute right-1 top-1 z-50 rounded-full border border-primary-500 bg-primary-500 p-1 font-bold text-red-600"
                onClick={(e) => removeImageFromSelection(index, otherImages, 'other')}
              >
                x
              </div>
            <img
              className="image"
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              id={`${file.name}`}
            />
          </div>
        ))}
      </div>
      </section>
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
