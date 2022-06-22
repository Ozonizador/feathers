import React from "react";
// import "./Pg4_5homecard.css";
import Image from "next/image";
import { RiUserLine } from 'react-icons/ri';
import { BiBed } from 'react-icons/bi';
import { TbBed } from 'react-icons/tb'
import { GrRestroom } from 'react-icons/gr'


function Pg4_5homecard(props) {
    const routeChange = () => {
        let path = `/4_5`;
        // navigate(path);
    };


    return (
        <div>
            <div className="container mb-4">
                <div className="row"></div>
                <div className="col-12">
                    <div
                        className="cards card-destaque" // style={{ maxHeight: "600px", maxWidth: "600px" }}
                        // style={{ maxHeight: "200px" }}>
                        >
                        
                        <div className="row ">
                            <div className="col-3 col-xs-4 ">
                                <Image src={props.img} className="card-img" alt="..." height={32} width={32} />
                            </div>
                            <div onClick={routeChange} className="col-8 col-xs-8 ">
                                <div className="hotel-card_info m-1 ">
                                    <div className="d-flex align-items-center">
                                        <h6 className="mb-0 ">
                                            Quarto Privado em T3 - Peniche
                                        </h6>
                                        <div className="m-1">
                                            <Image src="/images/stars.png" alt=""  height={32} width={32}  />
                                        </div>
                                    </div>
                                    {/* icon with images */}
                                    <div className="amnities d-flex mb-2 mt-3">
                                        
                                        <RiUserLine />
                                        <span className="m-1" style={{ fontSize: "12px" }}>
                                            2 Hóspedes
                                        </span>
                                        <i className="fa-solid fa-bed m-1"></i>
                                        <span className="m-1" style={{ fontSize: "12px" }}>
                                            <BiBed />
                                            1 Cama
                                        </span>
                                        
                                        <span className="m-1" style={{ fontSize: "12px" }}>
                                            <TbBed />
                                            1 Quarto
                                        </span>

                                        <i className="fa-solid fa-toilet m-1"></i>
                                        <span className="m-1" style={{ fontSize: "12px" }}>
                                            <GrRestroom />
                                            1 Casa De Banho
                                        </span>
                                    </div>
                                    <div className="d-flex mb-1 mt-2" style={{ fontSize: "12px" }}>
                                        <ul id="classlist" className="d-flex flex-row space-between" style={{ gap: "20px" }}>
                                            <li>Wifi</li>
                                            <li>Cozinha</li>
                                            <li>Secretária</li>
                                            <li>Varanda</li>
                                        </ul>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 mt-4">
                                            <button id="cardbtn">
                                                Favoritos
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <div className="hotel-card_pricing text-center">
                                                <h3
                                                    style={{ color: "#C48B60" }}
                                                >
                                                    300€/mês
                                                </h3>
                                                <div className="d-flex">
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Despesas incluídas
                                                    </p>
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

export default Pg4_5homecard;
