import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {AiFillLock} from "react-icons/ai"

export default function Menu() {
  const [summary1, setSummary1] = useState(true);
  const [summary2, setSummary2] = useState(true);
  const [summary3, setSummary3] = useState(true);

  const textRouteChange = () => {
    let path = `/22`;
    // navigate(path);
  };
  return (
    <article className="componentx">
        <div className="font-bold text-xl mb-8 ml-4">Painel</div>
      <details>
        <summary className="w-80"
          onClick={() => {
            setSummary1(!summary1);
          }}
        >

            
          <div className="flex items-center gap-4 align-middle ">
            
            <h1 className="font-bold text-xl ">Anúncios</h1>
          </div>
          <Image
            src={summary1 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>
        <div className="flex items-center justify-start align-middle">
          <div className=" flex flex-col  gap-4 text-base ml-5">
          <div className="ml-1 mt-4 font-bold text-base">Informações gerais</div>
    
            <Link href="/15">&#9679; Detalhes dos anúncios</Link>
            <Link href="/16">&#9679; Fotos</Link>
            <Link href="/16">&#9679; Condições e regras</Link>
            <Link href="/16">&#9679; Preços</Link>
            <Link href="/">
            <a className=" flex items-center  flex-row mb-4"><AiFillLock className="mr-1" />Informações contratuais</a></Link>
          </div>
        </div>
      </details>
      <details>
        <summary
          onClick={() => {
            setSummary2(!summary2);
          }}
        >
          <div className="flex items-center gap-4 align-middle">
           
            <p className="text-xl font-bold">Calendário</p>
          </div>
          <Image
            src={summary2 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>

        <div className="flex items-center justify-start align-middle">
          <div className=" flex flex-col  gap-4 text-base ml-5">
          
    
            <Link href="/15">&#9679; Detalhes dos anúncios</Link>
            <Link href="/16">&#9679; Fotos</Link>
            <Link href="/16">&#9679; Condições e regras</Link>
            <Link href="/16">&#9679; Preços</Link>
            <Link href="/">
            <a className=" flex items-center  flex-row mb-4"><AiFillLock className="mr-1" />Informações contratuais</a></Link>
          </div>
        </div>


      
      </details>
      <details onClick={textRouteChange}>
        <summary
          onClick={() => {
            setSummary3(!summary3);
          }}
        >
          <div className="flex items-center gap-4 align-middle">
          <p className="text-xl font-bold">Reviews</p>
          </div>
          <Image
            src={summary3 ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
            height={32}
            width={32}
            alt=""
          />
        </summary>

        <div className="flex items-center justify-start align-middle">
          <div className=" flex flex-col  gap-4 text-base ml-5">
          <div className="ml-1 mt-4 font-bold text-base">Informações gerais</div>
    
            <Link href="/15">&#9679; Detalhes dos anúncios</Link>
            <Link href="/16">&#9679; Fotos</Link>
            <Link href="/16">&#9679; Condições e regras</Link>
            <Link href="/16">&#9679; Preços</Link>
            <Link href="/">
            <a className=" flex items-center  flex-row mb-4"><AiFillLock className="mr-1" />Informações contratuais</a></Link>
          </div>
        </div>

    
        <div className="h-2"></div>
      </details>
    </article>
  );
}
