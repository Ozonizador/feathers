import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherDatePicker from "../utils/FeatherDatepicker";
import { dateToFormat } from "../../utils/utils";
{
  /* AINDA PRECISA DE MUDANÇAS */
}
export const SearchInputField = () => {
  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const router = useRouter();

  const sendQueryRequest = () => {
    router.push({
      pathname: "/procurar",
      query: { address, startDate: dateToFormat(startDate), endDate: dateToFormat(endDate) },
    });
  };

  return (
    <>
      <div className="container flex-row justify-center lg:flex">
        <div className="my-2 lg:mx-2">
          <input
            type="text"
            className="bg-terciary-50 h-16 w-full rounded-xl border p-0 px-2 lg:w-72"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Encontrar &#x2302; em:"
          />
        </div>

        <div className="flex flex-row gap-2 lg:gap-0">
          <div className="my-2 w-1/2 lg:mx-2">
            <FeatherDatePicker
              date={startDate}
              className="bg-terciary-50 h-16 w-full rounded-xl border lg:w-52"
              onChange={(date) => setStartDate(date)}
              // placeholder="&#x2192; Entrada"
            />
          </div>
          <div className="my-2 w-1/2 lg:mx-2">
            <FeatherDatePicker
              className="bg-terciary-50 h-16 w-full rounded-xl border lg:w-52"
              date={endDate}
              onChange={(date) => setEndDate(date)}
              // placeholder="&#x2190; Saida"
            />
          </div>
        </div>
        <div className="my-2">
          <button onClick={sendQueryRequest} className="h-16 w-full rounded-lg bg-primary-500 px-6 transition lg:w-32">
            <Image height={32} width={32} src="/images/icon-search.svg" className="my-auto mx-auto" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInputField;
