import { createServerSupabaseClient, Session, User } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import {
  Advertisement,
  AdvertisementPhoto,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
  HouseZonesLabel,
} from "../../../../models/advertisement";
import { AiOutlinePlusCircle } from "react-icons/ai";

import useAdvertisementService from "../../../../hooks/advertisementService";
import classNames from "classnames";
import { toast } from "react-toastify";
import {
  useSelectedAnuncioMenuSenhorio,
  useSetSelectedAnuncioMenuSenhorio,
} from "../../../../context/MenuSenhorioAnuncioProvider";
import { GetServerSidePropsContext } from "next";
import Button from "../../../../components/utils/Button";

interface PhotosProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

const Photos = ({ advertisement }: PhotosProps) => {
  const { removePicture, saveImage, updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const [selectedImages, setSelectedImages] = useState<AdvertisementPhoto[]>([]);

  const photos = advertisementContext ? advertisementContext.photos : ([] as AdvertisementPhoto[]);

  const saveChanges = async () => {
    const { data, error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
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
        const { data, error } = await saveImage(advertisementContext.id, file.name, file);
        if (data) {
          paths.push({ url: data.publicUrl, zone: "other" });
        }
      }

      const currentPhotos = advertisementContext.photos || [];
      // associate images to advertisement
      const { data, error } = await updateAdvertisement(
        { ...advertisementContext, photos: [...currentPhotos, ...paths] },
        advertisementContext.id
      );
      if (error) return toast.error(error.message);
      setAdvertisement(data);
      event.target.value = null;
    }
  };

  const toggleImageSelection = (toggledImage) => {
    const index = selectedImages.findIndex((image) => image.url == toggledImage.url);
    let newImageSelection = selectedImages;
    if (index !== -1) {
      newImageSelection.splice(index, 1);
    } else {
      newImageSelection = [...selectedImages, toggledImage];
    }
    setSelectedImages(newImageSelection);
  };

  const deletePhoto = async (url: string) => {
    const { data, error } = await removePicture(advertisementContext.id, url);
    if (!error && data.length > 0) {
      const photosAux = advertisementContext.photos.filter((photo) => photo.url !== url);
      const { data, error } = await updateAdvertisement(
        { ...advertisementContext, photos: photosAux },
        advertisementContext.id
      );
      if (error) return toast.error(error.message);
      setAdvertisement(data);
    }
  };

  const isImageSelected = useCallback(
    (url: string) => {
      const image = selectedImages.find((image) => image.url == url);
      return image !== undefined;
    },
    [selectedImages]
  );

  const setImagesZone = async (event) => {
    const value = (event.target as HTMLInputElement).value;

    if (value === "main" && selectedImages.length !== 1) {
      toast.error("Só pode ter 1 foto de capa");
      return;
    } else {
      let { photos } = advertisementContext;

      let newImages = photos.map((photo) => {
        if (checkIfImageInSelected(photo.url)) {
          return { url: photo.url, zone: value } as AdvertisementPhoto;
        } else {
          return photo;
        }
      });
      const { data, error } = await updateAdvertisement(
        { ...advertisementContext, photos: newImages },
        advertisementContext.id
      );
      if (error) return toast.error(error.message);
      setAdvertisement(data);
    }
    setSelectedImages([]);
  };

  const checkIfImageInSelected = async (url) => {
    const foundImage = selectedImages.find((image) => image.url == url);
    return foundImage !== undefined;
  };

  useEffect(() => {
    setAdvertisementContext(advertisement);
  }, []);

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>

        {/* FOTOS */}
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-7 text-2xl font-semibold">Fotografias</div>

          <div className="mx-auto flex w-64 flex-col gap-6 lg:w-full lg:flex-row lg:items-center">
            <>
              {photos &&
                photos.length > 0 &&
                photos.map((photo, index) => {
                  return (
                    <div
                      className={classNames(
                        "relative h-64 w-64 rounded-lg bg-black bg-cover bg-no-repeat lg:h-32 lg:w-32",
                        {
                          "border-4 border-primary-500": isImageSelected(photo.url),
                        }
                      )}
                      key={index}
                      onClick={(e) => toggleImageSelection(photo)}
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

                      <Image src={photo.url} layout="fill" alt="photo" />
                    </div>
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
          {selectedImages && selectedImages.length !== 0 && (
            <>
              <div className="mt-4">
                <>
                  <h3 className="text-xl text-neutral-400">Associar photos</h3>
                  {Object.keys(HouseZonesLabel).map((zone, index) => {
                    return (
                      <div key={index} className="py-1" onChange={(e) => setImagesZone(e)}>
                        <input type="radio" id="scales" name="type" value={zone} />
                        <label htmlFor="scales" className="my-auto ml-1">
                          {HouseZonesLabel[zone]}
                        </label>
                      </div>
                    );
                  })}
                </>
              </div>
            </>
          )}
          <div className="mr-auto mt-5 w-1/2">
            <Button onClick={saveChanges} type="button">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const { query } = ctx;
  const { slug } = query;

  if (!slug) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: advertisement, error } = await supabase
    .from(ADVERTISEMENT_TABLE_NAME)
    .select("*")
    .eq(ADVERTISEMENT_PROPERTIES.SLUG, slug)
    .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, session.user.id)
    .single();

  if (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      initialSession: session,
      user: session.user,
      advertisement: advertisement,
    },
  };
};