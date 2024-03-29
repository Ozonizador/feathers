import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SetStateAction, useState } from "react";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../models/profile";
import { trpc } from "../../utils/trpc";
import Button from "../../components/utils/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Advertisement } from "../../models/advertisement";
import { Pagination } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Sidebar from "../../components/notus/Sidebar/Sidebar";
import CardTable from "../../components/notus/Cards/CardTable";

const FaqSuperAdminPage = () => {
  const { data, refetch } = trpc.advertisements.getAdvertisements.useQuery();
  const removerAd = trpc.advertisements.removeAdvertisement.useMutation();
  const verifyAd = trpc.advertisements.verifyAdvertisement.useMutation();
  const advertisements = data && data.data;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPerPage = 10;
  const totalPages =
    advertisements?.length != undefined
      ? advertisements.length / totalPerPage - ((advertisements.length / totalPerPage) % 1)
      : 0;

  const onPageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const removerAdvertisement = async (advertisementId: string) => {
    await removerAd.mutateAsync({ advertisementId });
    refetch();
  };

  const validarAdvertisement = async (advertisementId: string) => {
    await verifyAd.mutateAsync({ advertisementId });
    refetch;
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 flex flex-col px-10 pt-5">
        <div className="mt-5 text-2xl">Anuncios:</div>
        {advertisements && (
          // @ts-ignore
          <CardTable title="Anúncios" labels={["Título", "Senhorio", "Morada", "Disponibilidade", ""]} advertisements={advertisements} />
        )}
      </div>
    </>
  );
};

/**
 * Super Admin Faq Items
 */

type SuperAdminFaqItemProps = Pick<
  Advertisement,
  "id" | "title" | "place" | "postal_code" | "street" | "street_number" | "verified"
> & {
  removerAdvertisement: (id: string) => void;
  verifyAdvertisement: (id: string) => void;
};

const SuperAdminAdvertisementItem = ({
  id,
  title,
  place,
  postal_code,
  street,
  street_number,
  verified,
  removerAdvertisement,
  verifyAdvertisement,
}: SuperAdminFaqItemProps) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-1 py-5">
        <h6 className="text-xl font-black">
          {title}
          {verified == true ? "test " : "test "}
        </h6>
        <p>{`${street} ${street_number != undefined ? street_number : ""}, ${postal_code} ${place}`}</p>
      </div>
      <div className="my-auto ml-auto flex h-10 gap-3">
        {verified == false && (
          <div
            className="cursor-pointer rounded-xl border border-primary-500 p-2 px-4 text-primary-500"
            onClick={() => verifyAdvertisement(id)}
          >
            Verify
          </div>
        )}

        <Button type={"button"} onClick={() => removerAdvertisement(id)}>
          Remover
        </Button>
      </div>
    </div>
  );
};

export default FaqSuperAdminPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
        locale: locale,
      },
    };

  const user = session.user;
  const { data, error } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  if (error || !data || data.user_type !== "ADMIN")
    return {
      redirect: {
        destination: "/",
        permanent: false,
        locale: locale,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
