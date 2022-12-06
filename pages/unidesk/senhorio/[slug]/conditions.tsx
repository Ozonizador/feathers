import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import useAdvertisementService from "../../../../hooks/advertisementService";
import { toast } from "react-toastify";
import {
  useSelectedAnuncioMenuSenhorio,
  useSetSelectedAnuncioMenuSenhorio,
} from "../../../../context/MenuSenhorioAnuncioProvider";
import HouseRulesComponent from "../../../../components/anuncio/HouseRulesComponent";
import { GetServerSidePropsContext } from "next";
import Button from "../../../../components/utils/Button";
import { ADVERTISEMENT_TABLE_NAME, ADVERTISEMENT_PROPERTIES } from "../../../../models/advertisement";

const Conditions = () => {
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const saveChanges = async () => {
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (!error) {
      toast("Anúncio Atualizado");
    } else {
      toast("Erro ao atualizar anúncio");
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-2 text-2xl font-semibold">Condições</div>
          <div className="text-xl text-gray-700">As suas regras</div>

          {advertisementContext && (
            <>
              <HouseRulesComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />

              <div className="pb-4">
                <Button onClick={saveChanges} type="button">
                  Guardar alterações
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conditions;

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
