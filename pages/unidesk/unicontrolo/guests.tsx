import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";
import Breadcrumb from "../../../components/hospedes/breadcrumb/Breadcrumb";
import { getCurrentReservationsByHostId } from "../../../services/reservationService";
import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import { Reservation } from "../../../models/reservation";
import HospedeCard from "../../../components/hospedes/HospedeCard/HospedeCard";

const UniControloHospedes = () => {
  const { user } = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const getCurrentGuests = useCallback(async () => {
    if (user) {
      const { data, error } = await getCurrentReservationsByHostId(user.id);
      if (!error) {
        setReservations(data);
      }
    }
  }, [user]);

  useEffect(() => {
    getCurrentGuests();
  }, [getCurrentGuests]);

  return (
    <section>
      <Breadcrumb />

      <div className="container mx-auto my-16 w-4/6 rounded-2xl  bg-terciary-300 py-20 ">
        <div className="flex gap-10 px-12">
          <div>
            <HospedesMenu activeLink="guests" />
          </div>

          <div className="ml-10">
            <>
              <div className="mb-7 text-3xl font-semibold">Hóspedes</div>
              <div className="mb-5 font-bold">Hóspedes Atuais</div>
              {reservations.map((reservation, index) => {
                return <HospedeCard reservation={reservation} key={index} />;
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
