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
import { useEffect, useState } from "react";
import { UnideskStructure } from "../../../../components/unidesk/UnideskStructure";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface ConditionsProps {
  initialSession: Session;
  user: User;
  advertisement: Advertisement;
}

const Conditions = ({ advertisement }: ConditionsProps) => {
  const { t } = useTranslation();
  const { updateAdvertisement } = useAdvertisementService();
  const advertisementContext = useSelectedAnuncioMenuSenhorio();
  const setAdvertisementContext = useSetSelectedAnuncioMenuSenhorio();
  const setAdvertisement = useSetSelectedAnuncioMenuSenhorio();
  const [loading, setLoading] = useState<boolean>(true);

  const saveChanges = async () => {
    if (!advertisementContext) return;
    const { error } = await updateAdvertisement(advertisementContext, advertisementContext.id);
    if (!error) {
      toast.success(t("messages:success.advert_was_updated"));
    } else {
      toast.error(t("messages:errors.advert_not_updated"));
    }
  };

  const changeAdvertisementProperty = (property: string, value: any) => {
    if (!advertisementContext) return;
    setAdvertisement({[property]: value, ...advertisementContext });
    advertisement = {...advertisement, [property]: value.house_rules}
    setAdvertisementContext(advertisement);
    setAdvertisement(advertisement);
  };

  useEffect(() => {
    if (loading){
      setAdvertisementContext(advertisement);
      setLoading(false)
    }
  }, [advertisement, setAdvertisementContext, loading, setLoading]);

  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio activeSection="single_advert" activeUrl="advert_conditions" />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
        <div className="mb-2 text-2xl font-semibold">{t("advertisements:conditions")}</div>
        <div className="text-xl text-gray-700">{t("advertisements:your_rules")}</div>

        {advertisementContext && (
          <>
            <HouseRulesComponent advertisement={advertisementContext} onChange={changeAdvertisementProperty} />

            <div className="mb-10 w-1/2">
              <Button onClick={saveChanges} type="button">
                {t("save_changes")}
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
  const locale = ctx.locale;
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const { query } = ctx;
  const { slug } = query;

  if (!slug) {
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
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
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };
  }
  return {
    props: {
      initialSession: session,
      user: session.user,
      advertisement: advertisement,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
