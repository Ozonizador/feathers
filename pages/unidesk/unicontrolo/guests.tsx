import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";
import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import HospedeCard from "../../../components/hospedes/HospedeCard/HospedeCard";
import useStayService from "../../../services/stayService";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { StayGuest } from "../../../models/stay";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";

// Icon
import IconAHospedes from "../../../public/images/icon-pg37-1.svg";

const paths = [{ url: "", label: "Hóspedes" }] as BreadcrumbPath[];

const UniControloHospedes = () => {
  const { getCurrentStaysByHostId } = useStayService();
  const user = useUser();
  const [stays, setStays] = useState<StayGuest[]>([]);
  const getCurrentGuests = useCallback(async () => {
    if (user) {
      const { data, error } = await getCurrentStaysByHostId(user.id);
      if (!error) {
        setStays(data);
      }
    }
  }, [user]);

  useEffect(() => {
    getCurrentGuests();
  }, [getCurrentGuests]);

  return (
    <section>
      <Breadcrumbs icon={IconAHospedes} paths={paths} />

      <div className="mx-auto my-16 w-11/12 rounded-2xl bg-terciary-300 py-20 lg:w-4/6 ">
        <div className="flex flex-col gap-10 px-12 lg:flex-row">
          <div>
            <HospedesMenu activeLink="guests" />
          </div>

          <div className="ml-10">
            <>
              <div className="mb-7 text-3xl font-semibold">Hóspedes</div>
              <div className="mb-5 font-bold">Hóspedes Atuais</div>
              {!stays || (stays.length === 0 && <div>Sem hospedes</div>)}
              {stays.map((stay, index) => {
                return <HospedeCard stay={stay} key={index} />;
              })}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniControloHospedes;

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

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
