import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ReservationPayment } from "../../models/reservation_payment";
import { createRandomUniqWord } from "../../utils/utils";
import { addReservationPayment, AddReservationPaymentProps, getUserPhone } from "../helpers/paymentsHelper";
import { authorizedProcedure } from "../procedure";
import { router } from "../trpc";

const options = {
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
};

const PaymentSchema = z.object({ value: z.number(), reservationId: z.string() });

export const paymentsRouter = router({
  addMultibancoPayment: authorizedProcedure.input(PaymentSchema).mutation(async ({ input, ctx }) => {
    if (!process.env.EUPAGO_API_URL) throw new TRPCError({ message: "Missing API KEY", code: "INTERNAL_SERVER_ERROR" });

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
        const { successo, entidade, estado, valor, referencia, resposta } = response;
        if (!successo || resposta != "OK")
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

        return { entidade, referencia, valor };
      })
      .catch((err) => {
        console.log(err);
        throw new TRPCError({ message: "Error creating the payment reference", code: "INTERNAL_SERVER_ERROR" });
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
        alias: phone || "",
      };

      debugger;
      fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/mbway/create`, { ...options, body: JSON.stringify(body) })
        .then((response) => response.json())
        .then((response) => {
          const { successo } = response;
          if (!successo) throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });
          debugger;
          console.log(response);

          // {
          //   "sucesso": true,
          //   "estado": 0,
          //   "resposta": "OK",
          //   "referencia": 8870231,
          //   "valor": "12.95000",
          //   "alias": "351#987654321"
          // }
        })
        .catch((err) => {
          console.log(err);
          throw new TRPCError({ message: "Error creating the mbway reference", code: "INTERNAL_SERVER_ERROR" });
        });
    }),
  checkIfPaymentWasMade: authorizedProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!process.env.EUPAGO_API_URL)
        throw new TRPCError({ message: "Missing API KEY", code: "INTERNAL_SERVER_ERROR" });

      const { userId } = ctx;
      const { reference } = input;

      const body = {
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      };

      fetch(`${process.env.EUPAGO_API_URL}/clientes/rest_api/multibanco/info`, {
        ...options,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          const { successo } = response;
          if (!successo) throw new TRPCError({ message: "Erro ao criar referência", code: "BAD_REQUEST" });

          // add
          // {
          //   "entidade": "12345",
          //   "referencia": "123456789",
          //   "identificador": "Exemplo-em-JSON",
          //   "estado": 0,
          //   "data_criacao": "2021-10-28",
          //   "hora_criacao": "14:37:23",
          //   "estado_referencia": "pendente",
          //   "arquivada": false,
          //   "sucesso": true,
          //   "resposta": "OK"
          // }
        })
        .catch((err) => {
          console.log(err);
          throw new TRPCError({ message: "Error checking the reference", code: "INTERNAL_SERVER_ERROR" });
        });
    }),
});

// export type definition of API
export type PaymentsRouter = typeof paymentsRouter;
