import { createClient } from '@supabase/supabase-js';
import { toInteger } from 'lodash';

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
      .select("*");

      if (reservationError) {
        throw reservationError;
      }

      res.status(200).json(updateReservation);
    } catch (error) {
      console.error("Error handling data:", error.message);
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
