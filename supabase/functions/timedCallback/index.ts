// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
    global: { headers: { Authorization: req.headers.get("Authorization")! } },
  });

  // Database queries will have RLS policies enforced
  const { data, error } = await supabaseClient
    .from("reservations")
    .select("*")
    .neq("payment_status", "PAID")
    .neq("payment_status", "CANCELED")
    .neq("payment_status", "REFUNDED");

  if (data) {
    data.map(async function (reservation: any) {
      const today = new Date();
      const reservation_date = new Date(reservation.updated_at);

      const differenceInMilliseconds = today.valueOf() - reservation_date.valueOf();

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

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
