import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import HouseRulesComponent from "../../../../components/anuncio/HouseRulesComponent";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement from "../../../../models/advertisement";
import {
  getSingleAdvertisement,
  updateAdvertisement,
} from "../../../../services/advertisementService";

interface ConditionsProps {
  id: string;
}

const Conditions = ({ id }: ConditionsProps) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();

  const getAdvertisementInfo = useCallback(async () => {
    const { data, error } = await getSingleAdvertisement(id);
    if (!error) {
      setAdvertisement(data);
    }
  }, [id]);

  const saveChanges = async () => {
    const { data, error } = await updateAdvertisement(advertisement, id);
    if (!error) {
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  useEffect(() => {
    getAdvertisementInfo();
  }, [getAdvertisementInfo]);

  return (
    <div className="flex px-24">
      <div className="w-1/5">
        <MenuSenhorio id={id} />
      </div>
      <div className="w-4/5">
        {advertisement && (
          <HouseRulesComponent
            advertisement={advertisement}
            onChange={changeAdvertisementProperty}
          />
        )}
        <div>
          <button className="bg-primary-500 p-2" onClick={saveChanges}>
            Guardar alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conditions;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
