import React from "react";

function Togglebtn() {
  return (
    <div>
      <div className="container mt-4">
        <div className="row text-center">
          <div className="col">
            {" "}
            <h1>FAQ</h1>
          </div>
        </div>
        <div className="row text-center">
          <div className="col"></div>
          <div className="col">
            <div id="toggle-div">
              <a
                id="btn-toogle"
                href="#"
                className="btn active"
                role="button"
                data-bs-toggle="button"
              >
                Toggle link
              </a>
              <a
                id="btn-toogle2"
                href="#"
                className="btn  active"
                role="button"
                data-bs-toggle="button"
                aria-pressed="true"
              >
                Senhorio
              </a>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default Togglebtn;
