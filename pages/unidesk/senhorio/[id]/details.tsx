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
import {
  getSingleAdvertisement,
  updateAdvertisement,
} from "../../../../services/advertisementService";

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
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  return (
    <div className="mx-auto my-20 flex w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 py-12 px-12">
      <div className="w-1/5">
        <MenuSenhorio id={id} />
      </div>
      <div className="ml-36 w-full">
        {advertisement && (
          <>
            <div>
              <h5 className="font-bold">{advertisement.title}</h5>
              <AdvertisementInfoComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
              <HouseCapacityComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>

            <div>
              <h5 className="font-bold">{advertisement.title}</h5>
              <AdvertisementInfoComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
              <AnuncioDisponivel
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>

            <div>
              <h5 className="mb-6 text-xl text-gray-600">Sobre a sua casa</h5>
              <AboutHouseComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>
            <div>
              <h5 className="mb-6 text-xl text-gray-600">Localização</h5>
              <GeneralAdvertComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>
            <div>
              <h5 className="font-bold">Política de Cancelamento</h5>
              <HostFlexTypeComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>
          </>
        )}
        <button
          className="mt-10  rounded-md bg-primary-500 py-5 px-6 text-white"
          onClick={saveChanges}
        >
          Guardar alterações &#10230;
        </button>
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
