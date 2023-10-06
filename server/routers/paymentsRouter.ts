import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ReservationPayment } from "../../models/reservation_payment";
import { createRandomUniqWord } from "../../utils/utils";
import {
  addReservationPayment,
  AddReservationPaymentProps,
  EU_PAGO_TO_PAYMENT_STATUS,
  getUserPhone,
  updateAdvertisementPayment,
  updateReservationPayment,
} from "../helpers/paymentsHelper";
import { authorizedProcedure, isHostProcedure } from "../procedure";
import { router } from "../trpc";
import { test } from "node:test";

const options = {
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
};

const PaymentSchema = z.object({ reservationId: z.string(), value: z.number()});

export const paymentsRouter = router({
  addMultibancoPayment: authorizedProcedure.input(PaymentSchema).mutation(async ({ input, ctx }) => {
    if (!process.env.EUPAGO_API_KEY) throw new TRPCError({ message: "Missing API KEY", code: "INTERNAL_SERVER_ERROR" });
    if (!process.env.EUPAGO_API_URL) throw new TRPCError({ message: "Missing URL", code: "INTERNAL_SERVER_ERROR" });
    const { userId } = ctx;
    const { value, reservationId } = input;

    const { phone } = await getUserPhone(userId);
    const body = {
      chave: process.env.EUPAGO_API_KEY,
      valor: value,
      per_dup: 0,
      // email: "",
      contacto: phone || "",
      id: createRandomUniqWord(),
    };

    fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/create`, {
      ...options,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(async (response) => {
        const { sucesso, entidade, valor, referencia, resposta } = response;
        if (!sucesso || resposta != "OK")
          throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });

        const paymentReservationInfo = {
          entidade,
          estado: "GENERATED",
          valor,
          reference: referencia,
          reservation_id: reservationId,
          metadata: response,
          payment_type: "MULTIBANCO",
        } as AddReservationPaymentProps;

        await addReservationPayment(reservationId, paymentReservationInfo);
        await updateAdvertisementPayment(reservationId);

        console.log(paymentReservationInfo)
        return (paymentReservationInfo);
      })
      .catch((err) => {
        throw new TRPCError({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
      });
  }),
  addMbWayPayment: authorizedProcedure
    .input(PaymentSchema.extend({ inputtedPhone: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!process.env.EUPAGO_API_URL)
        throw new TRPCError({ message: "Missing API KEY", code: "INTERNAL_SERVER_ERROR" });

      const { userId } = ctx;
      const { value, reservationId, inputtedPhone } = input;

      const { phone } = await getUserPhone(userId);
      const body = {
        chave: process.env.EUPAGO_API_KEY,
        valor: value,
        id: createRandomUniqWord(),
        descricao: "",
        // email: "",
        contacto: inputtedPhone || "",
        alias: inputtedPhone || "",
      };

      fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/mbway/create`, { ...options, body: JSON.stringify(body) })
        .then((response) => response.json())
        .then(async (response) => {
          const { sucesso, valor, referencia, resposta } = response;
          if (!sucesso || resposta != "OK")
            throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });

          const paymentReservationInfo = {
            estado: "GENERATED",
            valor,
            reference: referencia,
            reservation_id: reservationId,
            metadata: response,
            payment_type: "MBWAY",
          } as AddReservationPaymentProps;

          await addReservationPayment(reservationId, paymentReservationInfo);
          await updateAdvertisementPayment(reservationId);

          return { referencia, valor };
        })
        .catch((err) => {
          throw new TRPCError({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
        });
    }),
  checkIfPaymentWasMade: isHostProcedure
    .input(z.object({ reference: z.string(), reservationId: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!process.env.EUPAGO_API_URL)
        throw new TRPCError({ message: "Missing API KEY", code: "INTERNAL_SERVER_ERROR" });

      const { reference, reservationId } = input;

      const body = {
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      };

      fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/info`, {
        ...options,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then(async (response) => {
          const { sucesso, referencia, identificador, estado_referencia, entidade, resposta, arquivada } = response;
          if (!sucesso || resposta != "OK")
            throw new TRPCError({ message: "Erro ao verificar referência", code: "BAD_REQUEST" });

          const paymentStatus = EU_PAGO_TO_PAYMENT_STATUS[estado_referencia];
          await updateReservationPayment(reservationId, paymentStatus);
        })
        .catch((err) => {
          throw new TRPCError({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
        });
    }),
});

// export type definition of API
export type PaymentsRouter = typeof paymentsRouter;
