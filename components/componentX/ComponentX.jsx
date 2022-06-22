import React from "react";
import { useState } from "react";
import Icon1 from "../../Assets/images/icons8_resume.svg";
import Icon2 from "../../Assets/images/icons8_hostel.svg";
import Icon3 from "../../Assets/images/icons8_settings_3.svg";
import TriangleUp from "../../Assets/images/icons8-sort-up-30.png";
import TriangleDown from "../../Assets/images/icons8-sort-down-30.png";
import { Link } from "react-router-dom";

import { useNavigate  as navigate} from "react-router-dom";

import "./ComponentX.css";

export default function ComponentX() {
  const [summary1, setSummary1] = useState(true);
  const [summary2, setSummary2] = useState(true);
  const [summary3, setSummary3] = useState(true);

  const textRouteChange = () => {
    let path = `/22`;
    navigate(path);
  };
  return (
    <article className="componentx">
      <details>
        <summary
          onClick={() => {
            setSummary1(!summary1);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <img src={Icon1} alt="" />
            </div>
            <p>Conta</p>
          </div>
          <img src={summary1 ? TriangleDown : TriangleUp} alt="" />
        </summary>
        <ul>
          <li>
            <Link to="/15">Informações pessoais</Link>
          </li>
          <li>
            <Link to="/16">Métodos de pagamento</Link>
          </li>
          <li>
            <a href="">Informações contratuais</a>
          </li>
        </ul>
      </details>
      <details>
        <summary
          onClick={() => {
            setSummary2(!summary2);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <img src={Icon2} alt="" />
            </div>
            <p>Minha estadia</p>
          </div>
          <img src={summary2 ? TriangleDown : TriangleUp} alt="" />
        </summary>
        <ul>
          <li>
            <Link to="/18">Informações gerais</Link>
          </li>
          <li>
            <a href="">Renda</a>
          </li>
          <li>
            <Link to="/20">Reparações</Link>
          </li>
          <li>
            <Link to="/21">Despesas</Link>
          </li>
        </ul>
      </details>
      <details onClick={textRouteChange}>
        <summary
          onClick={() => {
            setSummary3(!summary3);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="summary-icon">
              <img src={Icon3} alt="" />
            </div>
            <p>Conta</p>
          </div>
          <img src={summary3 ? TriangleDown : TriangleUp} alt="" />
        </summary>
        <ul>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
      </details>
    </article>
  );
}
