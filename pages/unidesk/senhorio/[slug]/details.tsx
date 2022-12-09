import { createServerSupabaseClient, Session, User } from "@supabase/auth-helpers-nextjs";
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
  | "max_rooms"
  | "description"
  | "host_lives_property"
  | "type_host"
  | "street"
  | "street_number"
  | "type"
  | "place"
  | "postal_code"
>;

const Details = ({ advertisement }: DetailsProps) => {
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  /* Form */
  const methods = useForm<DetailsForm>({
    defaultValues: {
      title: advertisement.title,
      slug: advertisement.slug,
      max_rooms: advertisement.max_rooms,
      description: advertisement.description,
      host_lives_property: advertisement.host_lives_property,
      type_host: advertisement.type_host,
      street: advertisement.street,
      street_number: advertisement.street_number,
      place: advertisement.place,
      postal_code: advertisement.postal_code,
      type: advertisement.type,
    },
  });

  const saveChanges = async (data) => {
    const { error } = await updateAdvertisement({ ...advertisementContext, ...data }, advertisementContext.id);
    if (!error) {
      toast.success("Sucesso");
    } else {
      toast.error("Error saving the advertisement");
    }
  };

  const changeAdvertisementProperty = (property: string, value: unknown) => {
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  const onChangeMarker = (lat, lng) => {
    const coordsArray = coordinatesObjectToArray({ lat, lng });
    let newCoordinates = { type: "Point", coordinates: coordsArray };

    changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, newCoordinates);
  };

  const checkPossibilites = async () => {
    const { street, place, street_number, postal_code } = advertisementContext;
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
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>
        <div className="mx-6 pt-12 text-center  lg:text-left">
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
                <div className="flex flex-col gap-2 px-3">
                  <h5 className="font-bold">{advertisementContext.title}</h5>
                  <AdvertisementInfoComponent advertisement={advertisementContext} />
                  <HouseCapacityComponent advertisement={advertisementContext} />

                  <h5 className="text-xl text-gray-600">Sobre a sua casa</h5>
                  <AboutHouseComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />

                  <h5 className="mb-3 text-xl text-gray-600">Localização</h5>
                  <div className="my-5 mr-auto w-1/2 px-6">
                    <Button type="button" onClick={checkPossibilites}>
                      Atualizar No Mapa
                    </Button>
                  </div>
                  <GeneralAdvertComponent advertisement={advertisementContext} onChangeMarker={onChangeMarker} />

                  <h5 className="font-bold">Política de Cancelamento</h5>
                  <HostFlexTypeComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
                  <div className="my-5 mx-auto w-1/2 px-6">
                    <Button onClick={methods.handleSubmit(saveChanges)} type="button">
                      Guardar alterações &#10230;
                    </Button>
                  </div>
                </div>
              </FormProvider>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;

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
