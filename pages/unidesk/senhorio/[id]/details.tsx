import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import AdvertisementInfoComponent from "../../../../components/anuncio/AdvertisementInfoComponent";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HostFlexTypeComponent from "../../../../components/anuncio/HostFlexTypeComponent";
import HouseCapacityComponent from "../../../../components/anuncio/HouseCapacityComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import { ADVERTISEMENT_PROPERTIES } from "../../../../models/advertisement";
import useAdvertisementService from "../../../../hooks/advertisementService";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
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

const Details = () => {
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const saveChanges = async () => {
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
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
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {advertisementContext && (
            <>
              <div>
                <h5 className="font-bold">{advertisementContext.title}</h5>
                <AdvertisementInfoComponent
                  advertisement={advertisementContext}
                  onChange={changeAdvertisementProperty}
                />
                <HouseCapacityComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
              </div>

              <div>
                <h5 className="mb-6 text-xl text-gray-600">Sobre a sua casa</h5>
                <AboutHouseComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
              </div>
              <div className="mt-5">
                <h5 className="mb-3 text-xl text-gray-600">Localização</h5>
                <Button type="button" onClick={() => checkPossibilites()}>
                  Atualizar No Mapa
                </Button>
                <GeneralAdvertComponent
                  advertisement={advertisementContext}
                  onChange={changeAdvertisementProperty}
                  onChangeMarker={onChangeMarker}
                />
              </div>
              <div>
                <h5 className="font-bold">Política de Cancelamento</h5>
                <HostFlexTypeComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
              </div>
            </>
          )}
          <Button onClick={saveChanges} type={"button"}>
            Guardar alterações &#10230;
          </Button>
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

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
