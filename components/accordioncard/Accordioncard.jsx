import React from "react";
import "./Accordioncard.css";
import crousel1 from "../../Assets/images/crousel1.png";
import crousel2 from "../../Assets/images/crousel2.png";
import crousel3 from "../../Assets/images/crousel3.png";
import crousel4 from "../../Assets/images/crousel4.png";

function Accordioncard() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col p-4">
            <div
              className="accordion accordion-flush "
              id="accordionFlushExample"
            >
              <div className="accordion-item m-4">
                <h2 className="accordion-header">
                  <button
                    id="flush-headings"
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <i class="fa-solid fa-home m-2"></i> É senhoria unihosts
                    desde 2022
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col">
                        <img src={crousel1} alt="" />
                      </div>
                      <div className="col">
                        <img src={crousel2} alt="" />
                      </div>{" "}
                      <div className="col">
                        <img src={crousel3} alt="" />
                      </div>{" "}
                      <div className="col">
                        <img src={crousel4} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="accordion-item m-4 ">
                <h2 className="accordion-header">
                  <button
                    id="flush-headings"
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <i class="fa-solid fa-bed m-2"></i>É estudante unihosts
                    desde 2021
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the second item's accordion body. Let's imagine this being
                    filled with some actual content.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Accordioncard;
