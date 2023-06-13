import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Profile, ProfilesResponse, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../../models/profile";
import { createRandomUniqWord } from "../../utils/utils";
import { getUserPhone } from "../helpers/paymentsHelper";
import { authorizedProcedure } from "../procedure";
import { router } from "../trpc";

const options = {
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
};

const EUPAGO_URL = "https://sandbox.eupago.pt";

const PaymentSchema = z.object({ value: z.number(), reservationId: z.string() });

export const paymentsRouter = router({
  addMultibancoPayment: authorizedProcedure.input(PaymentSchema).query(async ({ input, ctx }) => {
    const { userId } = ctx;
    const { value, reservationId } = input;

    const { phone } = await getUserPhone(userId);
    const body = JSON.stringify({
      chave: process.env.EUPAGO_API_KEY,
      valor: value,
      per_dup: 0,
      // email: "",
      contacto: phone || "",
      id: createRandomUniqWord(),
    });

    fetch(`${EUPAGO_URL}/clientes/rest_api/multibanco/create`, { ...options, body })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }),
  addMbWayPayment: authorizedProcedure
    .input(PaymentSchema.extend({ inputtedPhone: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;
      const { value, reservationId, inputtedPhone } = input;

      const { phone } = await getUserPhone(userId);
      const body = JSON.stringify({
        chave: process.env.EUPAGO_API_KEY,
        valor: value,
        id: createRandomUniqWord(),
        descricao: "",
        // email: "",
        contacto: inputtedPhone || "",
        alias: phone || "",
      });

      fetch(`${EUPAGO_URL}/clientes/rest_api/mbway/create`, { ...options, body })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }),
  checkIfPaymentWasMade: authorizedProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;
      const { reference } = input;

      const body = JSON.stringify({
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      });

      fetch(`${EUPAGO_URL}/clientes/rest_api/multibanco/info`, { ...options, body })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }),
});

// export type definition of API
export type PaymentsRouter = typeof paymentsRouter;
