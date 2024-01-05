import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { RESERVATION_PAYMENTS_TABLE_NAME, ReservationPayment } from "../../models/reservation_payment";
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
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

const options = {
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
};

const PaymentSchema = z.object({ reservationId: z.string(), value: z.number() });

export const paymentsRouter = router({
  addMultibancoPayment: authorizedProcedure.input(PaymentSchema).mutation(async ({ input, ctx }) => {
    try {
      const { userId } = ctx;
      const { value, reservationId } = input;

      // Check for required environment variables
      if (!process.env.EUPAGO_API_KEY) {
        throw new TRPCError({ message: "Missing EUPAGO_API_KEY", code: "INTERNAL_SERVER_ERROR" });
      }
      if (!process.env.EUPAGO_API_URL) {
        throw new TRPCError({ message: "Missing EUPAGO_API_URL", code: "INTERNAL_SERVER_ERROR" });
      }

      const { phone } = await getUserPhone(userId);
      const body = {
        chave: process.env.EUPAGO_API_KEY,
        valor: value,
        per_dup: 0,
        contacto: phone || "",
        id: createRandomUniqWord()
      };

      const response = await fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/create`, {
        ...options, // Ensure options is defined
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      const { sucesso, entidade, valor, referencia, resposta, identificador	 } = responseData;
      if (!sucesso || resposta !== "OK") {
        throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });
      }

      const paymentReservationInfo = {
        entidade: entidade,
        estado: "GENERATED",
        valor: valor,
        reference: referencia,
        reservation_id: reservationId,
        metadata: responseData,
        payment_type: "MULTIBANCO",
      } as AddReservationPaymentProps;

      await addReservationPayment(reservationId, paymentReservationInfo);
      await updateAdvertisementPayment(reservationId);

      return paymentReservationInfo;
    } catch (error: any) {
      // Log the error
      console.error(error.message);
      throw new TRPCError({ message: error.message, code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  addMbWayPayment: authorizedProcedure
    .input(PaymentSchema.extend({ inputtedPhone: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { userId } = ctx;
        const { value, reservationId, inputtedPhone } = input;

        // Check for required environment variables
        if (!process.env.EUPAGO_API_URL) {
          throw new TRPCError({ message: "Missing EUPAGO_API_URL", code: "INTERNAL_SERVER_ERROR" });
        }

        const { phone } = await getUserPhone(userId);
        const body = {
          chave: process.env.EUPAGO_API_KEY,
          valor: value,
          id: createRandomUniqWord(),
          // descricao: "", // Remove if not needed
          // email: "", // Remove if not needed
          contacto: inputtedPhone || "",
          alias: inputtedPhone || "",
        };

        const response = await fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/mbway/create`, {
          ...options, // Ensure options is defined
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        const { sucesso, valor, referencia, resposta } = responseData;
        if (!sucesso || resposta !== "OK") {
          throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });
        }

        const paymentReservationInfo = {
          estado: "GENERATED",
          valor,
          reference: referencia,
          reservation_id: reservationId,
          metadata: responseData,
          payment_type: "MBWAY",
        } as AddReservationPaymentProps;

        await addReservationPayment(reservationId, paymentReservationInfo);
        await updateAdvertisementPayment(reservationId);

        return paymentReservationInfo;
      } catch (err: any) {
        // Log the error
        console.error(err.message);
        throw new TRPCError({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  checkIfPaymentWasCreated: authorizedProcedure
    .input(z.object({ reservation_id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { reservation_id } = input;
        const { data, error } = await supabaseAdmin
          .from<"reservation_payments", ReservationPayment>(RESERVATION_PAYMENTS_TABLE_NAME)
          .select()
          .eq("reservation_id", reservation_id)
          .single();

        return data;
      } catch (error: any) {
        console.log(error);
      }
    }),
  checkPayment: isHostProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { reservationId } = input;
        const { data, error } = await supabaseAdmin
          .from<"reservation_payments", ReservationPayment>(RESERVATION_PAYMENTS_TABLE_NAME)
          .select()
          .eq("reservation_id", reservationId)
          .single();

        let response = data as ReservationPayment;


        // Check for required environment variables
        if (!process.env.EUPAGO_API_URL) {
          throw new TRPCError({ message: "Missing EUPAGO_API_URL", code: "INTERNAL_SERVER_ERROR" });
        }

        // @ts-ignore
        const body = {
          chave: process.env.EUPAGO_API_KEY,
          // @ts-ignore
          referencia: response.referencia,
          entidade: response.entidade,
        };

        const responseFetch = await fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/info`, {
          ...options,
          body: JSON.stringify(body),
        });

        const responseData = await responseFetch.json();

        const { sucesso, estado_referencia, resposta } = responseData;

        if (!sucesso || resposta !== "OK") {
          throw new TRPCError({ message: "Erro ao verificar referência", code: "BAD_REQUEST" });
        }

        const paymentStatus = EU_PAGO_TO_PAYMENT_STATUS[estado_referencia];
        await updateReservationPayment(reservationId, paymentStatus);

        // Log successful payment information
        console.log(responseData);
      } catch (error: any) {
        console.log(error);
      }
    }),
  checkIfPaymentWasMade: isHostProcedure
    .input(z.object({ reference: z.string(), reservationId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        // Check for required environment variables
        if (!process.env.EUPAGO_API_URL) {
          throw new TRPCError({ message: "Missing EUPAGO_API_URL", code: "INTERNAL_SERVER_ERROR" });
        }

        const { reference, reservationId } = input;

        const body = {
          chave: process.env.EUPAGO_API_KEY,
          referencia: reference,
        };

        const response = await fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/info`, {
          ...options,
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        const { sucesso, estado_referencia, resposta } = responseData;

        if (!sucesso || resposta !== "OK") {
          throw new TRPCError({ message: "Erro ao verificar referência", code: "BAD_REQUEST" });
        }

        const paymentStatus = EU_PAGO_TO_PAYMENT_STATUS[estado_referencia];
        await updateReservationPayment(reservationId, paymentStatus);

        // Log successful payment information
        console.log(responseData);
      } catch (err: any) {
        // Log the error
        console.error(err.message);
        throw new TRPCError({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});

// export type definition of API
export type PaymentsRouter = typeof paymentsRouter;
