import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";
import Breadcrumb from "../../../components/hospedes/breadcrumb/Breadcrumb";
import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import HospedeCard from "../../../components/hospedes/HospedeCard/HospedeCard";
import { getCurrentStaysByHostId } from "../../../services/stayService";
import { StayGuest } from "../../../models/stay";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const UniControloHospedes = () => {
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
      <Breadcrumb />

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
              {/* <h2 className="mt-14 mb-6 text-xl text-secondary-500">Hóspedes Anteriores</h2> */}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniControloHospedes;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
