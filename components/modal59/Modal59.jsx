import React from "react";
import "./Modal59.css";
import feedback from "../../assets/images/feeedback.png";
function Modal59() {
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
                    <img
                      className="m-2"
                      src={feedback}
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <div id="model-heading" className="p-2">
                      Avaliar experiência
                    </div>
                  </div>
                  <div className="modal-body m-4 p-4">
                    <div className="jumbotron text-center m-4 p-4">
                      <h5>Obrigada pelo teu feedback!</h5>
                      <p>
                        A tua opinião é uma mais valia para a comunidade
                        unihosts, com certeza vai ajudar outros estudantes.
                      </p>
                      <p className="lead">
                        <a
                          className="btn btn-primary btn-lg"
                          href="#"
                          role="button"
                          id="modal-btn"
                        >
                          Fechar
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

export default Modal59;
