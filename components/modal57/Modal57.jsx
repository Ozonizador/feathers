import React from "react";
import "./Modal57.css";
import comment from "../../assets/images/comments.png";
function Modal57() {
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
                      width="10%"
                      height="10%"
                    />
                    <div id="model-heading" className="m-1">
                      Avaliar experiência
                    </div>
                  </div>
                  <div className="modal-body m-4 ">
                    <div className="jumbotron">
                      <p>Quarto Privado em T3 - Peniche</p>
                      <div id="rating-flex">
                        <div id="stars-text">Localização</div>
                        <div id="stars">
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                        </div>
                      </div>

                      <div id="rating-flex" className="mb-2 mt-2">
                        <div id="stars-text">Qualidade - preço</div>
                        <div id="stars">
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                        </div>
                      </div>

                      <div id="rating-flex" className="mb-2 mt-2">
                        <div id="stars-text">Comodidades</div>
                        <div id="stars">
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                        </div>
                      </div>

                      <div id="rating-flex" className="mb-2 mt-2">
                        <div id="stars-text">Senhorio</div>
                        <div id="stars">
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                        </div>
                      </div>

                      <div id="rating-flex" className="mb-4 mt-2">
                        <div id="stars-text">Avaliação Geral</div>
                        <div id="stars">
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1 "></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                          <span className="fa fa-star m-1"></span>
                        </div>
                      </div>
                      <p className="lead">
                        <a
                          className="btn btn-primary btn-lg mt-2 "
                          href="#"
                          role="button"
                          id="modal-btn"
                        >
                          Seguinte
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

export default Modal57;
