import React from "react";
import "./Modal58.css";
import comment from "../../assets/images/comments.png";
function Modal58() {
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
                      src={comment}
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <div id="model-heading" className="p-2">
                      Avaliar experiência
                    </div>
                  </div>
                  <div className="modal-body m-4 ">
                    <div className="jumbotron">
                      <h5>A UniHosts agradece!</h5>
                      <div className="mb-3">
                        <label
                          id="modal-label"
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Deixa o teu feedback público
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label
                          id="modal-label"
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Deixa o teu feedback privado ao senhorio
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <p className="lead">
                        <a
                          className="btn btn-primary btn-lg "
                          href="#"
                          role="button"
                          id="modal-btn"
                        >
                          Enviar
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

export default Modal58;
