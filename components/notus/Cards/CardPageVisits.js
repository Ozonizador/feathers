import { tr } from "date-fns/locale";
import React from "react";

// components

export default function CardPageVisits(data) {
  const reservations = data.data;
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3 className="text-blueGray-700 text-base font-semibold">Últimas reservas</h3>
            </div>
            <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
              <button
                className="mb-1 mr-1 rounded bg-primary-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-primary-500"
                type="button"
              >
                Ver todas
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead>
              <tr>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Nome
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Entrada
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Saída
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Estudante
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Qtd. hóspedes
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {reservations[0].advertisement.title}
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[0].start_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[0].end_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[0].tenant.name + " " + reservations[0].tenant.surname}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[0].number_guests}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {(reservations[0].status == "ACCEPTED" || reservations[0].status == "CHANGE_ACCEPTED") &&
                  reservations[0].payment_status == "PAID"
                    ? "Reserva Confirmada"
                    : (reservations[0].status == "ACCEPTED" || reservations[0].status == "CHANGE_ACCEPTED") &&
                      reservations[0].payment_status == "PENDING"
                    ? "Esperando Pagamanento"
                    : (reservations[0].status == "ACCEPTED" || reservations[0].status == "CHANGE_ACCEPTED") &&
                      reservations[0].payment_status == "NOT_GENERATED"
                    ? "Reserva Aceite"
                    : reservations[0].status == "REQUESTED" || reservations[0].status == "CHANGE_REQUESTED"
                    ? "Pedido de Reserva enviado"
                    : reservations[0].status == "REJECTED" || reservations[0].status == "CHANGE_REJECTED"
                    ? "Reserva Rejeitada"
                    : reservations[0].status == "EXPIRED"
                    ? "Reserva Expirada"
                    : ""}
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {reservations[1].advertisement.title}
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[1].start_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[1].end_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[1].tenant.name + " " + reservations[1].tenant.surname}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[1].number_guests}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {(reservations[1].status == "ACCEPTED" || reservations[1].status == "CHANGE_ACCEPTED") &&
                  reservations[1].payment_status == "PAID"
                    ? "Reserva Confirmada"
                    : (reservations[1].status == "ACCEPTED" || reservations[1].status == "CHANGE_ACCEPTED") &&
                      reservations[1].payment_status == "PENDING"
                    ? "Esperando Pagamanento"
                    : (reservations[1].status == "ACCEPTED" || reservations[1].status == "CHANGE_ACCEPTED") &&
                      reservations[1].payment_status == "NOT_GENERATED"
                    ? "Reserva Aceite"
                    : reservations[1].status == "REQUESTED" || reservations[1].status == "CHANGE_REQUESTED"
                    ? "Pedido de Reserva enviado"
                    : reservations[1].status == "REJECTED" || reservations[1].status == "CHANGE_REJECTED"
                    ? "Reserva Rejeitada"
                    : reservations[1].status == "EXPIRED"
                    ? "Reserva Expirada"
                    : ""}
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {reservations[2].advertisement.title}
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[2].start_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[2].end_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[2].tenant.name + " " + reservations[2].tenant.surname}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[2].number_guests}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {(reservations[2].status == "ACCEPTED" || reservations[2].status == "CHANGE_ACCEPTED") &&
                  reservations[2].payment_status == "PAID"
                    ? "Reserva Confirmada"
                    : (reservations[2].status == "ACCEPTED" || reservations[2].status == "CHANGE_ACCEPTED") &&
                      reservations[2].payment_status == "PENDING"
                    ? "Esperando Pagamanento"
                    : (reservations[2].status == "ACCEPTED" || reservations[2].status == "CHANGE_ACCEPTED") &&
                      reservations[2].payment_status == "NOT_GENERATED"
                    ? "Reserva Aceite"
                    : reservations[2].status == "REQUESTED" || reservations[2].status == "CHANGE_REQUESTED"
                    ? "Pedido de Reserva enviado"
                    : reservations[2].status == "REJECTED" || reservations[2].status == "CHANGE_REJECTED"
                    ? "Reserva Rejeitada"
                    : reservations[2].status == "EXPIRED"
                    ? "Reserva Expirada"
                    : ""}
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {reservations[3].advertisement.title}
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[3].start_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[3].end_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[3].tenant.name + " " + reservations[3].tenant.surname}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[3].number_guests}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {(reservations[3].status == "ACCEPTED" || reservations[3].status == "CHANGE_ACCEPTED") &&
                  reservations[3].payment_status == "PAID"
                    ? "Reserva Confirmada"
                    : (reservations[3].status == "ACCEPTED" || reservations[3].status == "CHANGE_ACCEPTED") &&
                      reservations[3].payment_status == "PENDING"
                    ? "Esperando Pagamanento"
                    : (reservations[3].status == "ACCEPTED" || reservations[3].status == "CHANGE_ACCEPTED") &&
                      reservations[3].payment_status == "NOT_GENERATED"
                    ? "Reserva Aceite"
                    : reservations[3].status == "REQUESTED" || reservations[3].status == "CHANGE_REQUESTED"
                    ? "Pedido de Reserva enviado"
                    : reservations[3].status == "REJECTED" || reservations[3].status == "CHANGE_REJECTED"
                    ? "Reserva Rejeitada"
                    : reservations[3].status == "EXPIRED"
                    ? "Reserva Expirada"
                    : ""}
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  {reservations[4].advertisement.title}
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[4].start_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[4].end_date}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[4].tenant.name + " " + reservations[4].tenant.surname}
                </td>
                <td className="whitespxwace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {reservations[4].number_guests}
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  {(reservations[4].status == "ACCEPTED" || reservations[4].status == "CHANGE_ACCEPTED") &&
                  reservations[4].payment_status == "PAID"
                    ? "Reserva Confirmada"
                    : (reservations[4].status == "ACCEPTED" || reservations[4].status == "CHANGE_ACCEPTED") &&
                      reservations[4].payment_status == "PENDING"
                    ? "Esperando Pagamanento"
                    : (reservations[4].status == "ACCEPTED" || reservations[4].status == "CHANGE_ACCEPTED") &&
                      reservations[4].payment_status == "NOT_GENERATED"
                    ? "Reserva Aceite"
                    : reservations[4].status == "REQUESTED" || reservations[4].status == "CHANGE_REQUESTED"
                    ? "Pedido de Reserva enviado"
                    : reservations[4].status == "REJECTED" || reservations[4].status == "CHANGE_REJECTED"
                    ? "Reserva Rejeitada"
                    : reservations[4].status == "EXPIRED"
                    ? "Reserva Expirada"
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
