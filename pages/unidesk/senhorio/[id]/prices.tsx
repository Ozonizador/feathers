import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../../context/MenuSenhorioAnuncioProvider";

import Advertisement from "../../../../models/advertisement";
import { getSingleAdvertisement, updateAdvertisement } from "../../../../services/advertisementService";

interface PricesProps {
  id: string;
}

const Prices = ({ id }: PricesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [advertisement, setAdvertisement] = useState<Advertisement>();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();

  const getAdvertisementInfo = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSingleAdvertisement(id);
    if (!error) {
      setAdvertisement(data);
      setAdvertisementContext(data);
    }
    setLoading(false);
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
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-7 text-2xl font-semibold">Preços</div>
          {loading && (
            <>
              <Spinner color="info" aria-label="loading" size="lg" />
            </>
          )}
          {!loading && advertisement && (
            <PricesComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
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

export default Prices;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
