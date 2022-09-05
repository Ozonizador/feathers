import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import AboutHouseComponent from "../../../../components/anuncio/AboutHouseComponent";
import AdvertisementInfoComponent from "../../../../components/anuncio/AdvertisementInfoComponent";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HostFlexTypeComponent from "../../../../components/anuncio/HostFlexTypeComponent";
import HouseCapacityComponent from "../../../../components/anuncio/HouseCapacityComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement, { ADVERTISEMENT_PROPERTIES } from "../../../../models/advertisement";
import { getSingleAdvertisement, updateAdvertisement } from "../../../../services/advertisementService";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { coordinatesObjectToArray } from "../../../../utils/map-services";
import { MapCoordinates } from "../../../../models/utils";
import { getResultsFromSearch } from "../../../../services/mapService";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../../context/MenuSenhorioAnuncioProvider";

interface DetailsProps {
  id: string;
}

const Details = ({ id }: DetailsProps) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();

  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();

  const getAdvertisementInfo = useCallback(async () => {
    const { data, error } = await getSingleAdvertisement(id);
    if (!error) {
      setAdvertisement(data);
      setAdvertisementContext(data);
    }
  }, [id, setAdvertisementContext]);

  useEffect(() => {
    getAdvertisementInfo();
  }, [getAdvertisementInfo]);

  const saveChanges = async () => {
    const { data, error } = await updateAdvertisement(advertisement, id);
    if (!error) {
      toast.success("Sucesso");
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  const onChangeMarker = (lat, lng) => {
    const coordsArray = coordinatesObjectToArray({ lat, lng });
    let newCoordinates = { type: "Point", coordinates: coordsArray };

    changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, newCoordinates);
  };

  const checkPossibilites = async () => {
    const { street, place, streetNumber, postalCode } = advertisement;
    const { data, error } = await getResultsFromSearch(`${street} ${place} ${streetNumber} ${postalCode}`);

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
          {!advertisement && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {advertisement && (
            <>
              <div>
                <h5 className="font-bold">{advertisement.title}</h5>
                <AdvertisementInfoComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
                <HouseCapacityComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
              </div>

              <div>
                <h5 className="mb-6 text-xl text-gray-600">Sobre a sua casa</h5>
                <AboutHouseComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
              </div>
              <div className="mt-5">
                <h5 className="mb-3 text-xl text-gray-600">Localização</h5>
                <button
                  type="button"
                  className="my-5 w-full items-center justify-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-60"
                  onClick={() => checkPossibilites()}
                >
                  Atualizar No Mapa
                </button>
                <GeneralAdvertComponent
                  advertisement={advertisement}
                  onChange={changeAdvertisementProperty}
                  onChangeMarker={onChangeMarker}
                />
              </div>
              <div>
                <h5 className="font-bold">Política de Cancelamento</h5>
                <HostFlexTypeComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
              </div>
            </>
          )}
          <button className="mt-10 mb-5 rounded-md bg-primary-500 py-5 px-6 text-white" onClick={saveChanges}>
            Guardar alterações &#10230;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
