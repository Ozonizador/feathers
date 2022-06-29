import React from "react";
import { CgFileDocument } from "react-icons/cg";
import Socials from "../components/socials/Socials";
import Input from "../components/utils/Input";

const Contactos = () => {
  return (
    <>
      <div className="m-32 flex flex-1 flex-col gap-5 lg:grid lg:grid-cols-2">
        <div className="lg:pl-32">
          <div className="py-3">
            <CgFileDocument className="inline text-xl" />
            <div className="my-auto ml-3 inline">Ajuda para os Estudantes</div>
          </div>
          <div>
            <CgFileDocument className="inline text-xl" />
            <div className="my-auto ml-3 inline">Ajuda para os Senhorios</div>
          </div>
          <div className="mt-10">
            <div className="text-3xl font-bold">Contactos</div>
            <div className="pt-5">+351 914 626 616</div>
            <div className="py-4">info@unihosts.pt</div>
          </div>
          <div>
            <Socials type="primary" size="sm" />
          </div>
        </div>
        <div>
          <div className="w-90">
            <Input onChange={() => {}} labelText="Nome" label="name" />
          </div>
          <div className="w-90 my-5">
            <Input onChange={() => {}} labelText="Email" label="email" />
          </div>
          <div>
            <textarea></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactos;
