import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import AboutHouseComponent from "../../../../components/anuncio/AboutHouseComponent";
import AdvertisementInfoComponent from "../../../../components/anuncio/AdvertisementInfoComponent";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HostFlexTypeComponent from "../../../../components/anuncio/HostFlexTypeComponent";
import HouseCapacityComponent from "../../../../components/anuncio/HouseCapacityComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement from "../../../../models/advertisement";
import AnuncioDisponivel from "../../../../components/anuncio/AnuncioDisponivel";
import { getSingleAdvertisement, updateAdvertisement } from "../../../../services/advertisementService";
import dynamic from "next/dynamic";
import { MapCoordinates } from "../../../../models/utils";
import { toast } from "react-toastify";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

interface DetailsProps {
  id: string;
}

const Details = ({ id }: DetailsProps) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();

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
      toast.success("Sucesso");
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  const createCurrentMapLocation = () => {
    return { latitude: advertisement.latitude, longitude: advertisement.longitude } as MapCoordinates;
  };

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="p-5 lg:border-r lg:p-12">
          <MenuSenhorio id={id} />
        </div>
        <div className="mx-6 pt-12 text-center  lg:text-left">
          <div className="mb-2 text-2xl font-semibold"></div>
          <div className="text-xl text-gray-700"></div>
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
                <h5 className="mb-6 text-xl text-gray-600">Localização</h5>
                {(advertisement.latitude === null || !advertisement.longitude === null) && (
                  <div>Não tem localização</div>
                )}
                {advertisement.latitude !== null && advertisement.longitude !== null && (
                  <>
                    <div className="h-96 w-full px-6">
                      <MapWithNoSSR currentMap={createCurrentMapLocation()} />
                    </div>
                  </>
                )}
                <GeneralAdvertComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
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
