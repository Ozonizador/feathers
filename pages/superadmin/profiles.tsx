import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS, Profile } from "../../models/profile";
import { trpc } from "../../utils/trpc";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Pagination } from "flowbite-react";
import Button from "../../components/utils/Button";
import { FaUser } from "react-icons/fa6";

// Components
import Sidebar from "../../components/notus/Sidebar/Sidebar";
import CardTable from "../../components/notus/Cards/CardTable";

const FaqSuperAdminPage = () => {
  const { data, refetch } = trpc.profile.getAllProfiles.useQuery();
  const profiles = data && data.data;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPerPage = 10;
  const totalPages =
    profiles?.length != undefined ? profiles.length / totalPerPage - ((profiles.length / totalPerPage) % 1) : 0;

  const onPageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 flex flex-col px-5 pt-5">
        <div className="mt-5 text-2xl">Perfis:</div>
        <div className="mt-5"></div>
        <CardTable
          title={"Perfis"}
          first_col_name={"Nome"}
          second_col_name={"Town"}
          third_col_name={"Sexo"}
          fourth_col_name="Tipo"
          fifth_col_name="Data de Nascimento"
          profiles={profiles}
        />
      </div>
    </>
  );
};

/**
 * Super Admin Faq Items
 */

type SuperAdminProfileItemProps = Pick<
  Profile,
  "id" | "name" | "avatar_url" | "surname" | "birth_date" | "nationality" | "email"
>;

const SuperAdminProfileItem = ({
  id,
  name,
  avatar_url,
  surname,
  birth_date,
  nationality,
  email,
}: SuperAdminProfileItemProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col gap-1 py-5">
          <div className="flex">
            {avatar_url != null && avatar_url != undefined && avatar_url != "" ? (
              <img src={avatar_url!} alt="Foto de Perfil" className="h-10 w-10 rounded-full bg-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                <FaUser color="gray" />
              </div>
            )}
            <h6 className="ml-4 flex items-center text-xl font-black">{name + " " + surname}</h6>
          </div>
          {showInfo && (
            <div className="">
              {birth_date != null ? <h6>Data de nascimento: {nationality}</h6> : ""}
              {nationality != null ? <h6>Nacionalidade: {nationality}</h6> : ""}
              {email != null ? <h6>Email: {email}</h6> : ""}
            </div>
          )}
        </div>
        <div className="ml-auto mt-5 flex h-10 gap-3">
          <Button type={"button"} onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Esconder Info" : "Mostrar Info"}
          </Button>
        </div>
      </div>
    </>
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
