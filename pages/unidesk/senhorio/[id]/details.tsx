import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import AboutHouseComponent from "../../../../components/anuncio/AboutHouseComponent";
import AdvertisementInfoComponent from "../../../../components/anuncio/AdvertisementInfoComponent";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HostFlexTypeComponent from "../../../../components/anuncio/HostFlexTypeComponent";
import HouseCapacityComponent from "../../../../components/anuncio/HouseCapacityComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement from "../../../../models/advertisement";
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
    <div className="flex px-24">
      <div className="w-1/5">
        <MenuSenhorio id={id} />
      </div>
      <div className="w-4/5">
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
              <h5>Sobre a sua casa</h5>
              <AboutHouseComponent
                advertisement={advertisement}
                onChange={changeAdvertisementProperty}
              />
            </div>
            <div>
              <h5>Localização</h5>
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
        <button className="bg-primary-500 p-2" onClick={saveChanges}>
          Guardar alterações
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
