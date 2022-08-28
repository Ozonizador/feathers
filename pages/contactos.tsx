import React, { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import Socials from "../components/socials/Socials";
import Input from "../components/utils/Input";

const Contactos = () => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendToEmail = () => {
    window.location.href = `mailto:info@unihosts.pt?subject=Contacto-${name}&body=${message}`;
  };

  return (
    <>
      <div className="container mx-auto my-20 w-full px-7 lg:container lg:my-20 lg:w-full  lg:px-28 ">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex w-full lg:w-1/3">
            <div className="flex flex-col gap-3">
              <div className="py-3 ">
                <CgFileDocument className="inline text-2xl" />
                <div className="my-auto ml-3 inline">Ajuda para os Estudantes</div>
              </div>
              <div>
                <CgFileDocument className="inline text-2xl" />
                <div className="my-auto ml-3 inline">Ajuda para os Senhorios</div>
              </div>

              <div className="mt-20">
                <div className="text-3xl font-bold">Contactos</div>
                <div className="pt-5">+351 914 626 616</div>
                <div className="py-4">info@unihosts.pt</div>
              </div>

              <div className="-ml-3">
                <Socials type="primary" size="sm" />
              </div>
            </div>
          </div>

          <div className="mt-10 w-full lg:mt-0 lg:w-2/3">
            <div className="mb-5 text-3xl font-bold">Deixe-nos uma mensagem!</div>
            <div className="w-90">
              <Input value={name} onChange={(e) => setName(e.target.value)} labelText="Nome" label="name" />
            </div>
            {/* <div className="w-90 my-5">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} labelText="Email" label="email" />
            </div> */}
            <div>
              <label htmlFor="about" className=" text-gray-700">
                Mensagem
              </label>
              <div className="mt-1">
                <textarea
                  rows={5}
                  className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
                  placeholder="A sua mensagem..."
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <button
              className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-32"
              onClick={() => sendToEmail()}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactos;
