import React from "react";

// não sei o que e isto.
function Faqs(props) {
  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item mt-2 mb-2">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button
                    style={{ backgroundColor: "white", color: "black" }}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    {props.heading1}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div className="accordion-body">{props.opentext}</div>
                </div>
              </div>
              <div className="accordion-item mt-2 mb-2">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button
                    style={{ backgroundColor: "#D6B592", color: "white" }}
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    {props.heading2}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">{props.opentext}</div>
                </div>
              </div>
              <div className="accordion-item mt-2 mb-2">
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                  <button
                    style={{ backgroundColor: "white", color: "black" }}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    {props.heading3}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">{props.opentext}</div>
                </div>
              </div>
              <div className="accordion-item mt-2 mb-2">
                <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                  <button
                    style={{ backgroundColor: "white", color: "black" }}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFour"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFour"
                  >
                    {props.heading4}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingFour"
                >
                  <div className="accordion-body">{props.opentext}</div>
                </div>
              </div>
              <div className="accordion-item mt-2 mb-2">
                <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                  <button
                    style={{ backgroundColor: "white", color: "black" }}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFive"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFive"
                  >
                    {props.heading5}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingFive"
                >
                  <div className="accordion-body">{props.opentext}</div>
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

export default Faqs;
