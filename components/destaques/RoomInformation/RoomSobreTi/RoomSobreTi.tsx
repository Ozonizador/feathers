import React from "react";

export default function RoomSobreTi() {
  return (
    <section className="mt-8 w-full">
      <div className="w-full rounded-2xl border border-terciary-700 px-4">
        <div className="flex flex-col gap-4 ">
          <div className="mt-3 text-xl font-bold">Sobre ti</div>
          <p className="text-sm text-secondary-500">
            Fala um pouco sobre ti e sobre o que procuras. O senhorio vai gostar de conhecer-te mais.
          </p>

          <textarea
            rows={7}
            className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
            placeholder="300 caracteres"
            defaultValue={""}
          />
        </div>
      </div>
    </section>
  );
}
