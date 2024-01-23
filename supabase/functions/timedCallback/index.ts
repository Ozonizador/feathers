// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { addHours } from "date-fns";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
    global: { headers: { Authorization: req.headers.get("Authorization")! } },
  });

  // Database queries will have RLS policies enforced
  const { data, error } = await supabaseClient
    .from("reservations")
    .select(
      "*, tenant:tenant_id(*), advertisement:advertisements(host:host_id(*), title, street, street_number, postal_code, place, month_rent, extra_per_host, expenses)"
    )
    .neq("payment_status", "PAID")
    .neq("payment_status", "CANCELED")
    .neq("payment_status", "REFUNDED")
    .neq("status", "REJECTED")
    .neq("status", "CHANGE_REJECTED")
    .neq("status", "EXPIRED");

  if (data) {
    data.map(async function (reservation: any) {
      const today = new Date();
      const reservation_date = new Date(reservation.updated_at);

      const differenceInMilliseconds = today.valueOf() - reservation_date.valueOf();

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      let included = "Despesas Incluídas";

      for (let expense of data[0].advertisements.expenses.services) {
        if (expense.included == "PARTIALLY" && included == "Despesas Incluídas")
          included = "Despesas Parcialmente incluídas";
        if (expense.included == "EXCLUDED") included = "Despesas excluídas";
      }

      if (
        addHours(reservation.updated_at, 12) <= today &&
        reservation.reminded != "REMIND_HOST" &&
        reservation.status == "REQUESTED"
      ) {
        let formData = {
          email: data[0].advertisement.host.email,
          templateId: "",
          data: {
            first_name: data[0].advertisement.host.name,
            accommodation_name: data[0].advertisements.title,
            reservation_occupation: data[0].advertisement.number_guests,
            accommodation_address: `${data[0].advertisements.street} ${data[0].advertisements.street_number}, ${data[0].advertisements.postal_code} ${data[0].advertisements.place}`,
            entry_date: new Date(data[0].start_date).toLocaleDateString(),
            departure_date: new Date(data[0].end_date).toLocaleDateString(),
            monthly_value:
              data[0].advertisements.month_rent + data[0].advertisements.extra_per_host * data[0].number_guests,
            bills_conditions: included,
            link: `unidesk/inbox?id=${data[0].id}`,
          },
        };

        // send email and sms

        // update table
        const { data: updateData, error } = await supabaseClient
          .from("reservations")
          .update({ reminded: "REMIND_HOST", updated_at: today })
          .eq("id", reservation.id);

        if (error) {
          console.error(`Error updating reservation: ${error.message}`);
        } else {
          console.log(`Updated reservation ID: ${reservation.id}`);
        }
      } else if (
        addHours(reservation.updated_at, 12) <= today &&
        reservation.reminded != "REMIND_TENANT" &&
        reservation.status == "ACCEPTED"
      ) {

        let formData = {
          email: data[0].tenant.email,
          templateId: "",
          data: {
            first_name: data[0].tenant.name,
            accommodation_name: data[0].advertisements.title,
            reservation_occupation: data[0].advertisement.number_guests,
            accommodation_address: `${data[0].advertisements.street} ${data[0].advertisements.street_number}, ${data[0].advertisements.postal_code} ${data[0].advertisements.place}`,
            entry_date: new Date(data[0].start_date).toLocaleDateString(),
            departure_date: new Date(data[0].end_date).toLocaleDateString(),
            monthly_value:
              data[0].advertisements.month_rent + data[0].advertisements.extra_per_host * data[0].number_guests,
            bills_conditions: included,
            link: `unidesk/inbox?id=${data[0].id}`,
          },
        };

        // send email and sms

        // update table
        const { data: updateData, error } = await supabaseClient
          .from("reservations")
          .update({ reminded: "REMIND_TENANT", updated_at: today })
          .eq("id", reservation.id);

        if (error) {
          console.error(`Error updating reservation: ${error.message}`);
        } else {
          console.log(`Updated reservation ID: ${reservation.id}`);
        }
      }

      if (differenceInDays > 3) {
        const { data: updateData, error } = await supabaseClient
          .from("reservations")
          .update({ payment_status: "CANCELED", status: "EXPIRED" })
          .eq("id", reservation.id);

        if (error) {
          console.error(`Error updating reservation: ${error.message}`);
        } else {
          console.log(`Updated reservation ID: ${reservation.id}`);
        }

        await supabaseClient
          .from("reservation_payments")
          .update({ estado: "EXPIRED" })
          .eq("reservation_id", reservation.id);
      }
    });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
