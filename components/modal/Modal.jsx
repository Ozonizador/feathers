import React from "react";
import flag from "../../Assets/images/flag.png";
function Modal() {
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
              <div className="modal-dialog modal-xl ">
                <div className="modal-content" id="model-radius">
                  <div id="header-flex" className="modal-header ">
                    <img
                      className="m-2"
                      src={flag}
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <div id="model-heading" className="p-2">
                      Reportar anúncio
                    </div>
                  </div>
                  <div className="modal-body m-2">
                    <h5 className="mt-2">
                      Porque estás a denunciar esta conta?
                    </h5>
                    <p className="mt-4">
                      A tua denúncia é anónima e deves ter em conta que pode
                      prejudicar outros caso não seja verdadeira. Se este
                      anúncio é impróprio ou não condiz com a realidade por
                      favor reporta.{" "}
                    </p>
                    <div className="radio mt-3">
                      <label>
                        <input
                          className="m-2"
                          type="radio"
                          name="optradio"
                          checked
                        />
                        É impreciso ou incorreto
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          className="m-2"
                          type="radio"
                          name="optradio"
                          checked
                        />
                        Não corresponde à realidade
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          className="m-2"
                          type="radio"
                          name="optradio"
                          checked
                        />
                        É um esquema
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          className="m-2"
                          type="radio"
                          name="optradio"
                          checked
                        />
                        É ofensivo
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input
                          className="m-2"
                          type="radio"
                          name="optradio"
                          checked
                        />
                        É outra coisa
                      </label>
                    </div>
                    <div className="">
                      <label>
                        <input
                          id="input-modal"
                          className="m-4"
                          placeholder="Conta-nos mais sobre isso"
                        />
                      </label>
                    </div>
                    <div className="modal-footer">
                      <a href="">
                        <button id="modal-btn" type="button" className="btn ">
                          Seguinte
                        </button>
                      </a>
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

export default Modal;
