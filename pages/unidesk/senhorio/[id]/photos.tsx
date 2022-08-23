import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement, { AdvertisementPhoto, HouseZonesLabel } from "../../../../models/advertisement";
import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  getSingleAdvertisement,
  removePicture,
  saveImage,
  updateAdvertisement,
} from "../../../../services/advertisementService";
import classNames from "classnames";

const Photos = ({ id }) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const photos = advertisement ? advertisement.photos : ([] as AdvertisementPhoto[]);
  const getAdvertisementInfo = useCallback(async () => {
    const { data, error } = await getSingleAdvertisement(id);
    if (!error) {
      setAdvertisement(data);
    }
  }, [id]);

  useEffect(() => {
    getAdvertisementInfo();
  }, [getAdvertisementInfo]);

  const saveChanges = async () => {
    const { data, error } = await updateAdvertisement(advertisement, id);
    if (!error) {
    }
  };

  const uploadToClient = async (event) => {
    event.preventDefault();
    const paths = [] as AdvertisementPhoto[];

    if (event.target.files) {
      let files = [];

      // saving files in memory
      for (let file of event.target.files) {
        files.push(file);
      }

      // saving images in storage
      for (let file of files) {
        const { publicURL, error } = await saveImage(advertisement.id, file.name, file);
        if (publicURL) {
          paths.push({ url: publicURL, zone: "other" });
        }
      }

      // associate images to advertisement
      const { data, error } = await updateAdvertisement(
        { ...advertisement, photos: [...advertisement.photos, ...paths] },
        advertisement.id
      );
      if (!error) {
        setAdvertisement(data);
      }
      event.target.value = null;
    }
  };

  const toggleImageSelection = (url) => {
    const index = selectedImages.findIndex((image) => image == url);
    let newImageSelection = null;
    if (index) {
      newImageSelection = selectedImages.splice(index, 1);
    } else {
      newImageSelection = [...selectedImages, url];
    }

    setSelectedImages(newImageSelection);
  };

  const deletePhoto = async (url: string) => {
    const { data, error } = await removePicture(advertisement.id, url);
    if (!error && data.length !== 0) {
      const photosAux = advertisement.photos.filter((photo) => photo.url !== url);
      const { data, error } = await updateAdvertisement({ ...advertisement, photos: photosAux }, advertisement.id);
      if (!error) {
        setAdvertisement(data);
      }
    }
  };

  const isImageSelected = (url) => {
    const image = selectedImages.find((image) => image == url);
    return image !== undefined;
  };

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="p-5 lg:border-r lg:p-12">
          <MenuSenhorio id={id} />
        </div>

        {/* FOTOS */}
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-7 text-2xl font-semibold">Fotografias</div>

          <div className="mx-auto flex w-64 flex-col  gap-6 lg:w-full lg:flex-row lg:items-center">
            <>
              {photos &&
                photos.length !== 0 &&
                photos.map((photo, index) => {
                  return (
                    <>
                      <div
                        className={classNames(
                          "relative h-64 w-64 rounded-lg bg-black bg-cover bg-no-repeat lg:h-32 lg:w-32",
                          { "border-2 border-blue-600": isImageSelected(photo.url) }
                        )}
                        key={index}
                        onClick={(e) => toggleImageSelection(photo.url)}
                      >
                        <div
                          className="absolute right-0 top-0 z-50 rounded-full border border-red-600 p-1 font-bold text-red-600"
                          onClick={() => deletePhoto(photo.url)}
                        >
                          x
                        </div>
                        {photo.zone !== "other" && (
                          <div className="absolute top-2 left-2 z-50 rounded-full bg-primary-500 px-3 py-1 text-xs text-white">
                            {HouseZonesLabel[photo.zone]}
                          </div>
                        )}

                        <Image src={photo.url} height={128} width={128} alt="photo" />
                      </div>
                    </>
                  );
                })}
              {/* BOTÃO */}
              <label htmlFor="files" className="relative cursor-pointer">
                <div className=" flex flex-col items-center justify-center align-middle">
                  <div>
                    <span className="text-5xl text-primary-300">
                      <AiOutlinePlusCircle />
                    </span>
                  </div>
                  <div className="text-gray-500">carregar mais fotos</div>
                </div>
              </label>

              <input
                type="file"
                id="files"
                onChange={uploadToClient}
                multiple
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
              />
            </>
          </div>
          <button
            className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-28"
            onClick={saveChanges}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photos;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
