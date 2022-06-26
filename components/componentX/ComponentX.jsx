import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ComponentX() {
  const [summary1, setSummary1] = useState(true);
  const [summary2, setSummary2] = useState(true);
  const [summary3, setSummary3] = useState(true);

  const textRouteChange = () => {
    let path = `/22`;
    // navigate(path);
  };
  return (
    <article className="componentx">
      <details>
        <summary
          onClick={() => {
            setSummary1(!summary1);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <Image src="/images/icons8_resume.svg" height={32} width={32} alt="" />
            </div>
            <p>Conta</p>
          </div>
          <Image
            src={summary1 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>
        <ul>
          <li>
            <Link href="/15">Informações pessoais</Link>
          </li>
          <li>
            <Link href="/16">Métodos de pagamento</Link>
          </li>
          <li>
            <a href="">Informações contratuais</a>
          </li>
        </ul>
      </details>
      <details>
        <summary
          onClick={() => {
            setSummary2(!summary2);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <Image src="/images/icons8_hostel.svg" height={32} width={32} alt="" />
            </div>
            <p>Minha estadia</p>
          </div>
          <Image
            src={summary2 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>
        <ul>
          <li>
            <Link href="/18">Informações gerais</Link>
          </li>
          <li>
            <a href="">Renda</a>
          </li>
          <li>
            <Link href="/20">Reparações</Link>
          </li>
          <li>
            <Link href="/21">Despesas</Link>
          </li>
        </ul>
      </details>
      <details onClick={textRouteChange}>
        <summary
          onClick={() => {
            setSummary3(!summary3);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <Image src="/images/icons8_settings_3.svg" height={32} width={32} alt="" />
            </div>
            <p>Conta</p>
          </div>
          <Image
            src={summary3 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>
        <ul>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
      </details>
    </article>
  );
}
