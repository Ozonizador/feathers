import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="my-5 rounded-lg border p-3">
        <div className="flex flex-1 border-b border-neutral-400 p-3">
          <div className="py-2 px-5">Iniciar sessão</div>
          <div className="border-l border-neutral-400 py-2 px-5 text-primary-500">Register</div>
        </div>
        <div className="p-3">
          <div className="font-bold">Bem-vindo de novo!</div>
          <div className="mt-3">
            <div>Email</div>
            <div className="mt-2">
              <input className="w-full"></input>
            </div>
          </div>
          <div className="mt-3">
            <div>Palavra-passe</div>
            <div className="mt-2">
              <input className="w-full"></input>
            </div>
          </div>
          <div className="text-center text-primary-500">Esqueci-me da palavra-passe</div>
          <div>
            <button>Iniciar sessão</button>
          </div>
          <div>ou</div>
          <div className="flex flex-1">
            <button>Facebook</button>
            <button>Gmail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
