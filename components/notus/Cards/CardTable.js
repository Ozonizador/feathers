import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// components

import TableDropdown from "../Dropdowns/TableDropdown";

export default function CardTable({ color, title, labels = [], profiles = null, advertisements = null }) {
  return (
    <>
      <div
        className={
          "relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3 className={"text-lg font-semibold " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead>
              <tr className="border border-x-0 ">
                {labels.length >= 1 &&
                  labels.map((label, index) => {
                    return (
                      <th
                        key={index}
                        className={
                          "whitespace-nowrap px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                        }
                      >
                        {label}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {profiles &&
                profiles.map((profile) => {
                  return (
                    <tr key={profile.id}>
                      <th className="flex items-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                        <img
                          src={
                            profile.avatar_url
                              ? profile.avatar_url
                              : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                          }
                          className="h-12 w-12 rounded-full border bg-white"
                          alt="..."
                        ></img>{" "}
                        <span className={"ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")}>
                          {profile.name + " " + profile.surname}
                        </span>
                      </th>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.town}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.gender == 1 ? "Masculino" : "Feminino"}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.type
                          ? profile.type == "TENANT"
                            ? "Estudante"
                            : "Senhorio"
                          : profile.prefered_unidesk_state == "TENANT"
                          ? "Estudante"
                          : "Senhorio"}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.birth_date}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.payment_methods?.swift ? profile.payment_methods?.swift : ""}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {profile.payment_methods?.iban ? profile.payment_methods?.iban : ""}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                        <TableDropdown options={["Visitar Perfil", "Eliminar Perfil"]} paths={[`/perfil/${profile.slug}`]}/>
                      </td>
                    </tr>
                  );
                })}
              {advertisements &&
                advertisements.map((ad) => {
                  return (
                    <tr key={ad.id}>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {ad?.title}
                      </td>
                      <th className="flex items-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                        <img
                          src={
                            ad?.host.avatar_url
                              ? ad?.host.avatar_url
                              : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                          }
                          className="h-12 w-12 rounded-full border bg-white"
                          alt="..."
                        ></img>{" "}
                        <span className={"ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")}>
                          {ad?.host?.name + " " + ad?.host.surname}
                        </span>
                      </th>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {`${ad?.place}, ${ad?.street} ${ad?.street_number}`}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                        {ad?.available == "AVAILABLE" ? "Disponível" : "Não disponível"}
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                        <TableDropdown
                          options={["Ver Anúncio", "Mudar Visibilidade", "Validar Anúncio", "Eliminar Anúncio"]}
                          paths={[`/anuncio/${ad.slug}`, `${ad.id}`, `${ad.verified}`, `${ad.id}`]}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
