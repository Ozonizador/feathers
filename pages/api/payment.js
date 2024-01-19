import { createClient } from '@supabase/supabase-js';
import { toInteger, update } from 'lodash';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let {referencia, entidade, valor, mp, data} = req.query;

      mp == "PC:PT" ? mp = "MULTIBANCO" : mp != null ? mp = "MBWAY" : mp = "";

      const { data: updatedPayment, error: errorPayment } = await supabase
        .from('reservation_payments')
        .update({"estado": "PAID"})
        .eq("referencia", referencia)
        .eq("entidade", entidade)
        .eq("valor", toInteger(valor))
        .eq("payment_type", mp)
        .select("*");

      if (errorPayment) {
        throw errorPayment;
      }

      const {data: updateReservation, reservationError } = await supabase
      .from('reservations')
      .update({"payment_status": "PAID", "status": "ACCEPTED"})
      .eq("id", updatedPayment[0].reservation_id)
      .select(
        "*, tenant:tenant_id(*), advertisements(host:host_id(*), street, street_number, postal_code, place, month_rent, extra_per_host, expenses)"
      );

      if (reservationError) {
        throw reservationError;
      }

      let included = "Despesas Incluídas";

      for (let expense of updateReservation[0].advertisements.expenses.services) {
        if (expense.included == "PARTIALLY" && included == "INCLUDED") included = "Despesas Parcialmente incluídas";
        if (expense.included == "EXCLUDED") included = "Despesas excluídas";
      }

      // Email for tenant
      let formData = {
        email: updateReservation[0].tenant.email,
        templateId: "",
        data: {
          first_name: updateReservation[0].tenant.name,
          accommodation_name: updateReservation[0].advertisements.title,
          reservation_occupation: updateReservation[0].number_guests,
          accommodation_address: `${updateReservation[0].advertisements.street} ${updateReservation[0].advertisements.street_number}, ${updateReservation[0].advertisements.postal_code} ${updateReservation[0].advertisements.place}`,
          entry_date: new Date(updateReservation[0].start_date).toLocaleDateString(),
          departure_date: new Date(updateReservation[0].end_date).toLocaleDateString(),
          monthly_value:
            updateReservation[0].advertisements.month_rent +
            updateReservation[0].advertisements.extra_per_host * updateReservation[0].number_guests,
          bills_conditions: included,
          link: `unidesk/inbox?id=${updateReservation[0].id}`,
        },
      };

      await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Email for landlord
      formData.email = updateReservation.advertisements.host.email;
      formData.templateId = ""
      formData.data.first_name = updateReservation.advertisements.host.name;

      await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      res.status(200).json(updateReservation);
    } catch (error) {
      console.error("Error handling data:", error.message);
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
