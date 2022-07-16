import React from "react";


export default function RoomSobreTi() {
    return (
        <section className="w-full mt-8">
            <div className="w-full border border-terciary-700 rounded-2xl px-4">
                <div className="flex flex-col gap-4 ">
                    <div className="text-xl font-bold mt-3">
                        Sobre ti
                    </div>
                    <p className="text-sm text-secondary-500">Fala um pouco sobre ti e sobre o que procuras. O senhorio vai gostar de conhecer-te mais.</p>

                    <textarea
                        rows={7}
                        className="mt-1 block w-full py-3 px-2 border-solid border border-terciary-500 bg-white rounded-md shadow-sm  mb-6"
                        placeholder="300 caracteres"
                        defaultValue={''}
                    />

                </div>
            </div>
        </section >
    );
}
