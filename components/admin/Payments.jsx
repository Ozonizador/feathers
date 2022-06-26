import React from "react";
import Link from "next/link";

/*
    pagina 33 do XD
*/

const Payments = () => {
  return (
    <div className="px-36">
      <div className="mb-10">
        <Link href="/admin">Conta</Link>
        {" > Pagamentos e Recebimentos"}
      </div>
    </div>
  );
};

export default Payments;
