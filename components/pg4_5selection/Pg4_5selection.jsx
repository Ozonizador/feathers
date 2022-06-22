import React from "react";
import "./Pg4_5selection.css";



import homemap from "../../Assets/images/homemap.png";
import Pg4_5homecard from "../../components/pg4_5homecard/Pg4_5homecard";
import home1 from "../../Assets/images/home1.png";
import home2 from "../../Assets/images/home2.png";
import home3 from "../../Assets/images/home3.png";
import home4 from "../../Assets/images/home4.png";
import home5 from "../../Assets/images/home5.png";
import home6 from "../../Assets/images/home6.png";





function Pg4_5selection() {
    return (
        <div>
            <div className="ycontainer-md">
                <div className="row">
                    <div className="col-7">
                        <div className="row ">
                            <div className="top">
                                <h2 className="headingt fs-100 clr-black-main bold" style={{ fontSize: "25px" }}>
                                    Pertence Onde Tu Quiseres!
                                </h2>

                                <div className="form-group col-4 otuline-secondary " style={{ width: "20%" }}>
                                    <select id="inputState" className="form-select">
                                        <option>Ordenar Por</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-md-3">
                                <select id="inputState" className="form-select form-control-lg select-destaques">
                                    <option>Tipo De Espaço</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select id="inputState" className="form-select form-control- select-destaques">
                                    <option>Preço</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select id="inputState" className="form-select form-control-lg select-destaques">
                                    <option>Comodidades</option>
                                    <option>...</option>
                                </select>
                            </div>

                            <div className="col-md-1"></div>
                            
                            <div className="col-md-2">
                                <button className="btn w-100" id="btn-destaques" style={{ backgroundColor: "#c48b60" }}>
                                    Mais Filtros
                                </button>
                            </div>
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home1} />
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home2} />
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home3} />
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home4} />
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home5} />
                        </div>

                        <div className="row">
                            <Pg4_5homecard img={home6} />
                        </div>

                        <div className="row mb-5">
                            <div className="col-md-2"></div>
                            <div className="col-md-5 d-flex justify-content-center">
                                <button className="btn w-auto shadow-none">
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button
                                    className="btn w-auto shadow-none"
                                    style={{
                                        backgroundColor: "#c48b60",
                                        color: "#fff",
                                    }}
                                >
                                    1
                                </button>
                                <button className="btn w-auto shadow-none">
                                    2
                                </button>
                                <button className="btn w-auto shadow-none">
                                    3
                                </button>
                                <button className="btn w-auto shadow-none">
                                    4
                                </button>
                                <button className="btn w-auto shadow-none">
                                    5
                                </button>
                                <button className="btn w-auto shadow-none">
                                    6
                                </button>
                                <button className="btn w-auto shadow-none">
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                            <div className="col-md-5"></div>
                        </div>
                    </div>
                    <div className="col-5 d-none d-lg-block ">
                        <img src={homemap} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pg4_5selection;
