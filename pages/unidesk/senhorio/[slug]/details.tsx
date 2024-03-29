import { createPagesServerClient, Session, User } from "@supabase/auth-helpers-nextjs";
import AdvertisementInfoComponent from "../../../../components/anuncio/AdvertisementInfoComponent";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HostFlexTypeComponent from "../../../../components/anuncio/HostFlexTypeComponent";
import HouseCapacityComponent from "../../../../components/anuncio/HouseCapacityComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import { Advertisement, ADVERTISEMENT_PROPERTIES, ADVERTISEMENT_TABLE_NAME } from "../../../../models/advertisement";
import useAdvertisementService from "../../../../hooks/advertisementService";
import { toast } from "react-toastify";
import { coordinatesObjectToArray } from "../../../../utils/map-services";
import { MapCoordinates } from "../../../../models/utils";
import { getResultsFromSearch } from "../../../../hooks/mapService";
import {
  useSelectedAnuncioMenuSenhorio,
  useSetSelectedAnuncioMenuSenhorio,
} from "../../../../context/MenuSenhorioAnuncioProvider";
import AboutHouseComponent from "../../../../components/anuncio/AboutHouseComponent";
import { GetServerSidePropsContext } from "next";
import Button from "../../../../components/utils/Button";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import AnuncioDisponivel from "../../../../components/anuncio/AnuncioDisponivel";
import { UnideskStructure } from "../../../../components/unidesk/UnideskStructure";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Spinner = dynamic(() => import("../../../../components/utils/Spinner"), {
  ssr: false,
});

interface DetailsProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

type DetailsForm = Pick<
  Advertisement,
  | "title"
  | "slug"
  | "description"
  | "host_lives_property"
  | "type_host"
  | "street"
  | "street_number"
  | "type"
  | "place"
  | "postal_code"
  | "available"
>;

const Details = ({ advertisement }: DetailsProps) => {
  const { t } = useTranslation();
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  /* Form */
  const methods = useForm<DetailsForm>({
    defaultValues: {
      title: advertisement.title,
      slug: advertisement.slug,
      description: advertisement.description,
      host_lives_property: advertisement.host_lives_property,
      type_host: advertisement.type_host,
      street: advertisement.street,
      street_number: advertisement.street_number,
      place: advertisement.place,
      postal_code: advertisement.postal_code,
      type: advertisement.type,
      available: advertisement.available,
    },
  });

  const saveChanges = async (data: any) => {
    if (!advertisementContext) return;
    const { error } = await updateAdvertisement({ ...advertisementContext, ...data }, advertisementContext.id);
    if (!error) {
      toast.success(t("messages:success.success"));
    } else {
      toast.error(t("messages:errors.saving_advert"));
    }
  };

  const changeAdvertisementProperty = (property: string, value: unknown) => {
    if (!advertisementContext) return;
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  const onChangeMarker = (lat: number, lng: number) => {
    const coordsArray = coordinatesObjectToArray({ lat, lng });
    let newCoordinates = { type: "Point", coordinates: coordsArray };

    changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, newCoordinates);
  };

  const checkPossibilites = async () => {
    const { street, place, street_number, postal_code } = methods.getValues();
    const { data, error } = await getResultsFromSearch(`${street} ${place} ${street_number} ${postal_code}`);

    if (!error && data && data.length > 0) {
      const feature = data[0];
      const geometry = feature.geometry as MapCoordinates;
      if (geometry) {
        changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, geometry);
      }
    }
  };

  useEffect(() => {
    if (advertisement) setAdvertisementContext(advertisement);
  }, [advertisement]);

  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio activeSection="single_advert" activeUrl="advert_details" />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
        <div className="mx-6 pt-12 text-center lg:text-left">
          <div className="mb-2 text-2xl font-semibold"></div>
          <div className="text-xl text-gray-700"></div>
          {!advertisementContext && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner />
            </div>
          )}
          {advertisementContext && (
            <>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(saveChanges)}>
                <div className="flex flex-col gap-5 px-3">
                  <h5 className="font-bold">{advertisementContext.title}</h5>
                  <AdvertisementInfoComponent advertisement={advertisementContext} showInternalName={true} />
                  <HouseCapacityComponent advertisement={advertisementContext} />

                  <h5 className="text-xl text-gray-600">{t("advertisements:add_advert.about_house_title")}</h5>
                  <AboutHouseComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />

                  <h5 className="text-xl text-gray-600">{t("location")}</h5>
                  <GeneralAdvertComponent advertisement={advertisementContext} onChangeMarker={onChangeMarker} />
                  <div className="mr-auto w-1/3">
                    <Button type="button" onClick={checkPossibilites}>
                      {t("update_map")}
                    </Button>
                  </div>

                  <h5 className="mt-6 text-2xl font-black">{t("advertisements:add_advert.cancellation_policy")}</h5>
                  <HostFlexTypeComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
                  <AnuncioDisponivel advertisement={advertisementContext} />
                  <div className="mx-auto my-5 w-1/2 px-6">
                    <Button onClick={methods.handleSubmit(saveChanges)} type="submit">
                      {t("save_changes")} &#10230;
                    </Button>
                  </div>
                </div>
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </UnideskStructure.Content>
    </UnideskStructure>
  );
};

export default Details;

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
