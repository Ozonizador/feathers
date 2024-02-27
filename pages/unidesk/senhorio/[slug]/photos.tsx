import { createPagesServerClient, Session, User } from "@supabase/auth-helpers-nextjs";
import React, { useCallback, useEffect, useState } from "react";
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
import { UnideskStructure } from "../../../../components/unidesk/UnideskStructure";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import IconCaixa from "../../../../public/images/iconCaixa.svg";
import Breadcrumbs, { BreadcrumbPath } from "../../../../components/utils/Breadcrumbs";
import BreadcrumbMiddle from "../../../../components/utils/BreadcrumbMiddle";
import { UNIDESK_URL } from "../../../../models/paths";
import iconfavorito from "../../../../public/images/icon-pg37-1.svg";

interface PhotosProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

const Photos = ({ advertisement }: PhotosProps) => {
  const { t } = useTranslation();
  const { removePicture, saveImage, updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const [selectedImages, setSelectedImages] = useState<AdvertisementPhoto[]>([]);

  const photos = advertisementContext ? advertisementContext.photos : ([] as AdvertisementPhoto[]);

  const paths = [
    { url: UNIDESK_URL, label: "Unidesk" },
    { url: "", label: "advert" },
  ] as BreadcrumbPath[];

  const saveChanges = async () => {
    if (!advertisementContext) return;
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (error) toast.error(t("messages:errors.saving_photos"));
    toast.success(t("messages:success.saved_success"))
  };

  const uploadToClient = async (event: any) => {
    event.preventDefault();
    const paths = [] as AdvertisementPhoto[];
    if (!advertisementContext) return;

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
      data && setAdvertisement(data);
      event.target.value = null;
    }
  };

  const toggleImageSelection = (toggledImage: AdvertisementPhoto) => {
    const index = selectedImages.findIndex((image) => image.url == toggledImage.url);
    let newImageSelection = selectedImages;
    if (index !== -1) {
      newImageSelection.splice(index, 1);
    } else {
      newImageSelection = [...selectedImages, toggledImage];
    }
    setSelectedImages(newImageSelection);
  };

  const deletePhoto = async (event: React.MouseEvent<HTMLDivElement>, url: string) => {
    event.stopPropagation();
    if (!advertisementContext) return;

    const { error } = await removePicture(advertisementContext.id, url);
    if (!error) {
      const photosAux = advertisementContext.photos.filter((photo) => photo.url !== url);
      const { data, error } = await updateAdvertisement(
        { ...advertisementContext, photos: photosAux },
        advertisementContext.id
      );
      if (error) return toast.error(error.message);
      data && setAdvertisement(data);
    }
  };

  const isImageSelected = useCallback(
    (url: string) => {
      const image = selectedImages.find((image) => image.url == url);
      return image !== undefined;
    },
    [selectedImages]
  );

  const setImagesZone = async (event: React.FormEvent<HTMLDivElement>) => {
    if (!advertisementContext) return;
    const value = (event.target as HTMLInputElement).value;

    if (value === "main" && selectedImages.length !== 1) {
      toast.error(t("messages:errors.only_one_main_photo"));
      return;
    } else {
      let { photos } = advertisementContext || { photos: [] };

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
      data && setAdvertisement(data);
    }
    setSelectedImages([]);
  };

  const checkIfImageInSelected = (url: string) => {
    const foundImage = selectedImages.find((image) => image.url == url);
    return foundImage !== undefined;
  };

  useEffect(() => {
    setAdvertisementContext(advertisement);
  }, [advertisement]);

  return (
    <div className="mx-5 h-full rounded-xl border lg:border-none">
      <div className="max-width my-20 rounded-2xl lg:container lg:my-20 lg:w-full">
        <Breadcrumbs icon={iconfavorito} paths={paths} />
      </div>
      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio activeSection="single_advert" activeUrl="advert_photos" />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          {/* FOTOS */}
          <div className="mb-7 text-2xl font-semibold">{t("admin:photo_other")}</div>

          <div className="mx-auto grid grid-cols-2 gap-6 lg:flex lg:w-full lg:flex-row lg:flex-wrap lg:items-center">
            <>
              {photos && photos.length > 0 && (
                <div>
                  <p>{t("advertisements:cover")}</p>
                  <div
                    className={classNames(
                      "relative h-64 w-64 rounded-lg bg-black bg-cover bg-no-repeat lg:h-32 lg:w-32",
                      {
                        "border-4 border-primary-500": isImageSelected(photos[0].url),
                      }
                    )}
                    key={0}
                    onClick={(e) => toggleImageSelection(photos[0])}
                  >
                    <div
                      className="text-black-900 absolute right-0 top-0 z-50 cursor-pointer rounded-full bg-primary-500 p-1 font-bold"
                      onClick={(e) => deletePhoto(e, photos[0].url)}
                    >
                      x
                    </div>
                    {photos[0].zone !== "other" && (
                      <div className="absolute left-2 top-2 z-50 rounded-full bg-primary-500 px-3 py-1 text-xs text-white">
                        {t(HouseZonesLabel[photos[0].zone])}
                      </div>
                    )}

                    <Image src={photos[0].url} fill alt="photo" />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap">
                <p className="w-full">{t("advertisements:other")}</p>
                <div className="flex flex-wrap">
                  {photos &&
                    photos.length > 0 &&
                    photos.slice(1).map((photo, index) => {
                      return (
                        <div
                          className={classNames(
                            "relative mb-2 mr-2 h-64 w-1/4 rounded-lg bg-black bg-cover bg-no-repeat lg:h-32 lg:w-32",
                            {
                              "border-4 border-primary-500": isImageSelected(photo.url),
                            }
                          )}
                          key={index}
                          onClick={(e) => toggleImageSelection(photo)}
                        >
                          <div
                            className="text-black-900 absolute right-0 top-0 z-50 cursor-pointer rounded-full bg-primary-500 p-1 font-bold"
                            onClick={(e) => deletePhoto(e, photo.url)}
                          >
                            x
                          </div>
                          {photo.zone !== "other" && (
                            <div className="absolute left-2 top-2 z-50 rounded-full bg-primary-500 px-3 py-1 text-xs text-white">
                              {t(HouseZonesLabel[photo.zone])}
                            </div>
                          )}

                          <Image src={photo.url} fill alt="photo" />
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* BOTÃO */}
              <label htmlFor="files" className="relative cursor-pointer">
                <div className=" flex flex-col items-center justify-center align-middle">
                  <div>
                    <span className="text-5xl text-primary-300">
                      <AiOutlinePlusCircle />
                    </span>
                  </div>
                  <div className="text-gray-500"></div>
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
                  <h3 className="text-xl text-neutral-400">{t("admin:associate_photos")}</h3>
                  {Object.keys(HouseZonesLabel).map((zone, index) => {
                    return (
                      <div key={index} className="py-1" onChange={(e) => setImagesZone(e)}>
                        <input type="radio" id="scales" name="type" value={zone} />
                        <label htmlFor="scales" className="my-auto ml-1">
                          {t(HouseZonesLabel[zone as keyof typeof HouseZonesLabel])}
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
              {t("save")}
            </Button>
          </div>
        </UnideskStructure.Content>
      </UnideskStructure>
    </div>
  );
};

export default Photos;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const { query } = ctx;
  const { slug } = query;

  if (!slug) {
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
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
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };
  }
  return {
    props: {
      initialSession: session,
      user: session.user,
      advertisement: advertisement,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
