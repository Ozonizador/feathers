import React from "react";
import "./Modal16.css";
import keyboard from "../../assets/images/keyboard.png";
function Modal16() {
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
              className="modal  fade modal-dialog modal-dialog-centered"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content" id="model-radius">
                  <div id="header-flex" className="modal-header ">
                    <img id="img-modal" className="m-2" src={keyboard} alt="" />
                    <div id="model-heading" className="p-2">
                      <p id="model-heading-text">
                        Adicionar detalhes do cartão
                      </p>
                    </div>
                  </div>
                  <div className="modal-body m-4 ">
                    <div className="container">
                      <div className="row">
                        <form className="row g-3">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              id="inputAddress"
                              placeholder="Número do cartão"
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail4"
                              placeholder="Validade"
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="CVV"
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              id="inputAddress2"
                              placeholder="Código postal"
                            />
                          </div>

                          <div className="col">
                            <label for="inputState" className="form-label">
                              País / regiáo
                            </label>
                            <select id="inputState" className="form-select">
                              <option selected>Portugal</option>
                              <option>...</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-6">
                                <button
                                  style={{ float: "right" }}
                                  type="submit"
                                  className="btn btn-secondary  btn-block"
                                >
                                  Cancelar
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  style={{ float: "left" }}
                                  id="btn-modal"
                                  type="submit"
                                  className="btn  btn-primary btn-block"
                                >
                                  Concluido
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
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

export default Modal16;
