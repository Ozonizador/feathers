import { createPagesServerClient, Session, User } from "@supabase/auth-helpers-nextjs";

import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import useAdvertisementService from "../../../../hooks/advertisementService";
import { toast } from "react-toastify";
import {
  useSelectedAnuncioMenuSenhorio,
  useSetSelectedAnuncioMenuSenhorio,
} from "../../../../context/MenuSenhorioAnuncioProvider";
import HouseRulesComponent from "../../../../components/anuncio/HouseRulesComponent";
import Button from "../../../../components/utils/Button";
import { Advertisement, ADVERTISEMENT_PROPERTIES, ADVERTISEMENT_TABLE_NAME } from "../../../../models/advertisement";
import { useEffect } from "react";
import { UnideskStructure } from "../../../../components/unidesk/UnideskStructure";
import { GetServerSidePropsContext } from "next";

interface ConditionsProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

const Conditions = ({ advertisement }: ConditionsProps) => {
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const saveChanges = async () => {
    if (!advertisementContext) return;
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (!error) {
      toast("Anúncio Atualizado");
    } else {
      toast("Erro ao atualizar anúncio");
    }
  };

  const changeAdvertisementProperty = (property: string, value: any) => {
    if (!advertisementContext) return;
    setAdvertisement({ ...advertisementContext, [property]: value });
  };

  useEffect(() => {
    setAdvertisementContext(advertisement);
  }, [advertisement, setAdvertisementContext]);

  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
        <div className="mb-2 text-2xl font-semibold">Condições</div>
        <div className="text-xl text-gray-700">As suas regras</div>

        {advertisementContext && (
          <>
            <HouseRulesComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />

            <div className="mb-10 w-1/2">
              <Button onClick={saveChanges} type="button">
                Guardar alterações
              </Button>
            </div>
          </>
        )}
      </UnideskStructure.Content>
    </UnideskStructure>
  );
};

export default Conditions;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
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
