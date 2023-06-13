import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
      .then((response) => {
        console.log(response);
        debugger;
        // work here

        // {
        //   "sucesso": true,
        //   "estado": 0,
        //   "resposta": "OK",
        //   "referencia": "123456789",
        //   "valor": "0.00000",
        //   "entidade": "12345",
        //   "valor_minimo": "5",
        //   "valor_maximo": "122.5",
        //   "data_inicio": "2021-10-28",
        //   "data_fim": "2099-12-31"
        // }
      })
      .catch((err) => {
        console.log(err);
        throw new TRPCError({ message: "Error creating the payment reference", code: "INTERNAL_SERVER_ERROR" });
      });
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
        .then((response) => {
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
      const { userId } = ctx;
      const { reference } = input;

      const body = JSON.stringify({
        chave: process.env.EUPAGO_API_KEY,
        referencia: reference,
      });

      fetch(`${EUPAGO_URL}/clientes/rest_api/multibanco/info`, { ...options, body })
        .then((response) => response.json())
        .then((response) => {
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
