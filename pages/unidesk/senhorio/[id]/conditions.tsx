import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import AboutHouseComponent from "../../../../components/anuncio/AboutHouseComponent";
import Advertisement from "../../../../models/advertisement";
import GeneralAdvertComponent from "../../../../components/anuncio/GeneralAdvertComponent";
import HouseRulesComponent from "../../../../components/anuncio/HouseRulesComponent";

import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
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
    <div className="container mx-auto my-20 rounded-2xl border border-terciary-200 bg-terciary-300 py-12">
      <div className="flex px-12">
        <div className="w-1/5">
          <MenuSenhorio id={id} />
        </div>
        <div className="ml-20 w-4/5">
          <div className="mb-7 text-2xl font-semibold">Condições e regras</div>
          <div className="text-xl text-gray-700">As suas regras</div>

          {advertisement && (
            <HouseRulesComponent
              advertisement={advertisement}
              onChange={changeAdvertisementProperty}
            />
          )}

          <div>
            <button
              className="hover: mt-14  flex w-44 items-center justify-center rounded-md bg-primary-500 py-3   text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
              onClick={saveChanges}
            >
              Guardar alterações
            </button>
          </div>
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
