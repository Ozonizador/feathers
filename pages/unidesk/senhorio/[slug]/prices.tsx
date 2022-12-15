import { createServerSupabaseClient, Session, User } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Button from "../../../../components/utils/Button";
import {
  useSelectedAnuncioMenuSenhorio,
  useSetSelectedAnuncioMenuSenhorio,
} from "../../../../context/MenuSenhorioAnuncioProvider";

import useAdvertisementService from "../../../../hooks/advertisementService";
import { ADVERTISEMENT_TABLE_NAME, ADVERTISEMENT_PROPERTIES, Advertisement } from "../../../../models/advertisement";

interface PricesProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

const Prices = ({ advertisement }: PricesProps) => {
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const saveChanges = async () => {
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (error) return toast.error(error.message);
    toast.success("Success");
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  useEffect(() => {
    setAdvertisementContext(advertisement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisement]);

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 pl-0 lg:container lg:my-20 lg:w-full lg:px-0">
      <div className="flex flex-col px-5 lg:flex-row">
        <div className="flex justify-center p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>
        <div className="mx-auto w-full pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-7 text-2xl font-semibold">Preços</div>

          {advertisementContext && (
            <PricesComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
          )}

          <div className="mr-auto mb-10 w-1/2">
            <Button onClick={saveChanges} type="button">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;

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
