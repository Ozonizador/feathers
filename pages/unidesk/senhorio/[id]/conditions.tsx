import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Advertisement from "../../../../models/advertisement";
import HouseRulesComponent from "../../../../components/anuncio/HouseRulesComponent";

import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import { getSingleAdvertisement, updateAdvertisement } from "../../../../services/advertisementService";
import { toast } from "react-toastify";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../../context/MenuSenhorioAnuncioProvider";
import { Spinner } from "flowbite-react";

interface ConditionsProps {
  id: string;
}

const Conditions = ({ id }: ConditionsProps) => {
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

  const saveChanges = async () => {
    const { error } = await updateAdvertisement(advertisement, id);
    if (!error) {
      toast("Anúncio Atualizado");
    } else {
      toast("Erro ao atualizar anúncio");
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  useEffect(() => {
    getAdvertisementInfo();
  }, [getAdvertisementInfo]);

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-2 text-2xl font-semibold">Condições</div>
          <div className="text-xl text-gray-700">As suas regras</div>

          {loading && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}

          {!loading && advertisement && (
            <>
              <HouseRulesComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />

              <div className="pb-4">
                <button
                  className="flex w-44 items-center justify-center rounded-md bg-primary-500 py-3 text-white duration-200 ease-in hover:drop-shadow-xl"
                  onClick={saveChanges}
                >
                  Guardar alterações
                </button>
              </div>
            </>
          )}
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
