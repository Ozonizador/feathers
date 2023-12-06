import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS, Profile } from "../../models/profile";
import { trpc } from "../../utils/trpc";
import { useTranslation } from "react-i18next";
import { Pagination } from "flowbite-react";
import Button from "../../components/utils/Button";
import { FaUser } from "react-icons/fa6";

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
    <div className="max-width flex flex-col px-10 pt-5">
      <div className="mt-5 text-2xl">Perfis:</div>
      <div className="mt-5"></div>
      {profiles &&
        profiles.map((profile, index) => {
          if ((currentPage - 1) * totalPerPage < index && index < currentPage * totalPerPage) {
            return (
              <div
                key={index}
                className={
                  index != totalPerPage - 1 + (currentPage - 1) * totalPerPage
                    ? "gap-1 border-b border-neutral-100"
                    : ""
                }
              >
                <SuperAdminProfileItem
                  key={profile.id}
                  id={profile.id}
                  name={profile.name}
                  avatar_url={profile.avatar_url}
                  surname={profile.surname}
                  birth_date={profile.birth_date}
                  nationality={profile.nationality}
                  email={profile.email}
                />
              </div>
            );
          }
        })}
      <div className="flex justify-center pb-5">
        <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} showIcons={true} />
      </div>
    </div>
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
    <div className="flex w-full">
      <div className="flex flex-col gap-1 py-5">
        <div className="flex">
          {avatar_url != null && avatar_url != undefined && avatar_url != "" ? (
            <img src={avatar_url!} alt="Foto de Perfil" className="h-10 w-10 rounded-full bg-cover" />
          ) : (
            <div className="h-10 w-10 border rounded-full flex items-center justify-center"><FaUser color="gray"/></div>
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
  );
};

export default FaqSuperAdminPage;

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
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
