import React from "react";
import "./Modal66.css";
import doublearrow from "../../assets/images/doublearrow.png";
function Modal66() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Modal</h1>
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div
              className="modal modal-lg fade modal-dialog modal-dialog-scrollable   "
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content" id="model-radius">
                  <div id="header-flex" className="modal-header ">
                    <img
                      id="modal-img"
                      className="m-2"
                      src={doublearrow}
                      alt=""
                      width="10%"
                      height="10%"
                    />
                    <div id="model-heading" className="p-2">
                      Alterar reserva
                    </div>
                  </div>
                  <div className="modal-body m-4 ">
                    <div className="jumbotron">
                      <p>
                        Diz ao teu senhorio porque queres alterar a tua reserva
                      </p>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="1"
                        ></textarea>
                      </div>
                      <p>Reserva Original</p>
                      <div className="row mb-4">
                        {/* left */}
                        <div className="col">
                          {" "}
                          <div className="input-group">
                            <div>
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Entrada
                              </label>
                              <input
                                type="date"
                                aria-label="First name"
                                className="form-control m-1"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Entrada
                              </label>
                              <input
                                type="date"
                                aria-label="Last name"
                                className="form-control m-1"
                              />
                            </div>

                            <div className="mb-3 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Número de hóspedes
                              </label>
                              <input
                                placeholder="1 hóspede"
                                type="text"
                                className="form-control"
                                id="exampleInputText"
                              />
                            </div>
                            <div className="text-center">
                              <h5>Pagamento Original</h5>
                              <a href="" id="link-modal">
                                Detalhes
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col">
                          <hr />
                        </div> */}
                        {/* right */}
                        <div className="col">
                          <div className="input-group">
                            <div>
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Entrada
                              </label>
                              <input
                                type="date"
                                aria-label="First name"
                                className="form-control m-1"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Entrada
                              </label>
                              <input
                                type="date"
                                aria-label="Last name"
                                className="form-control m-1"
                              />
                            </div>

                            <div className="mb-3 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Número de hóspedes
                              </label>
                              <input
                                placeholder="1 hóspede"
                                type="text"
                                className="form-control"
                                id="exampleInputText"
                              />
                            </div>
                            <div className="text-center">
                              <h5>Pagamento Original</h5>
                              <a href="" id="link-modal">
                                Detalhes
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="row">
                        <a
                          className="btn btn-primary btn-block "
                          href="#"
                          role="button"
                          id="modal-btn"
                        >
                          Enviar pedido de alteração
                        </a>
                      </p>
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

export default Modal66;
