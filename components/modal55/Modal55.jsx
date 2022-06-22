import React from "react";
import "./Modal55.css";
import flag from "../../assets/images/flag.png";
function Modal55() {
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
                      src={flag}
                      alt=""
                      width="30px"
                      height="30px"
                    />
                    <div id="model-heading" className="p-2">
                      Reportar anúncio
                    </div>
                  </div>
                  <div className="modal-body m-4 p-4">
                    <div className="jumbotron text-center m-4 p-4">
                      <h5>A UniHosts agradece!</h5>
                      <p>
                        Vamos averiguar a situação. Obrigada por teres
                        denunciado e tornado a nosssa comunidade unihosts num
                        lugar melhor!
                      </p>
                      <p className="lead">
                        <a
                          className="btn btn-primary btn-lg"
                          href="#"
                          role="button"
                          id="modal-btn"
                        >
                          Learn more
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

export default Modal55;
