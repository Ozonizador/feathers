import React from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { CgHeart } from "react-icons/cg";
import { GrRestroom } from "react-icons/gr";

export default function RoomInformation(props) {
  return (
    <div>
      <div className="container mb-4">
        <div>
          <div className="cards">
            <div className="flex flex-1">
              <div>
                {/* <Image src={props.img} className="card-img" alt="..." height={256} width={256} /> */}
              </div>
              <div className="p-3">
                <div className="m-1">
                  <div className="flex flex-1">
                    <h6 className="mb-0 ">Quarto Privado em T3 - Peniche</h6>
                    <div className="m-1">
                      <Image src="/images/stars.png" alt="" height={16} width={16} />
                    </div>
                  </div>
                  {/* icon with images */}
                  <div className="mb-2 mt-3 flex flex-1 justify-around">
                    <div>
                      <RiUserLine className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">2 Hóspedes</span>
                    </div>
                    <div className="ml-2">
                      <BiBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Cama</span>
                    </div>
                    <div className="ml-2">
                      <TbBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Quarto</span>
                    </div>
                    <div className="ml-2">
                      <GrRestroom className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Casa De Banho</span>
                    </div>
                  </div>
                  <div className="mb-1 mt-2 flex text-xs">
                    <ul id="classlist" className="flex gap-5 px-3">
                      <li className="list-none">Wifi</li>
                      <li>Cozinha</li>
                      <li>Secretária</li>
                      <li>Varanda</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-1">
                    <div className="my-auto">
                      <button className="rounded-md border-2 border-terciary-300 p-1 text-xs hover:border-primary-500">
                        <CgHeart className="inline" />
                        <span className="my-auto ml-2">Favoritos</span>
                      </button>
                    </div>
                    <div className="ml-auto">
                      <div className="text-center">
                        <h3 className="text-primary-500">300€/mês</h3>
                        <div className="d-flex">
                          <p className="text-xs">Despesas incluídas</p>
                          <i className="fa-solid fa-circle-info m-1"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
