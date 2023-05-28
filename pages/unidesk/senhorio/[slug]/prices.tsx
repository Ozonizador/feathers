import { createServerSupabaseClient, Session, User } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import { UnideskStructure } from "../../../../components/unidesk/UnideskStructure";
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
    if (!advertisementContext) return;

    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (error) return toast.error(error.message);
    toast.success("Success");
  };

  const changeAdvertisementProperty = (property: string, value: any) => {
    if (!advertisementContext) return;
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  useEffect(() => {
    setAdvertisementContext(advertisement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisement]);

  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
        <div className="mb-7 text-2xl font-semibold">Preços</div>

        {advertisementContext && (
          <PricesComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />
        )}

        <div className="mb-10 mr-auto w-1/2">
          <Button onClick={saveChanges} type="button">
            Guardar
          </Button>
        </div>
      </UnideskStructure.Content>
    </UnideskStructure>
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
