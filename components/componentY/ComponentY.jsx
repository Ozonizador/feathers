import React, { useState } from "react";
import Profile1 from "../../assets/images/icons8_male_user_2.svg";
import Exchange from "../../assets/images/icons8_card_exchange_1.svg";
import Cheque from "../../assets/images/icons8_paycheque.svg";
import Maintenance from "../../assets/images/icons8_maintenance_1.svg";
import { Link } from "react-router-dom";

import "./ComponentY.css";
const ComponentY = () => {
  const [link1, setLink1] = useState(false);
  const [link2, setLink2] = useState(false);
  const [link3, setLink3] = useState(false);
  const [link4, setLink4] = useState(false);

  const linkFunc = (index) => {
    switch (index) {
      case 1:
        setLink2(false);
        setLink3(false);
        setLink4(false);
        setLink1(true);
        break;

      case 2:
        setLink1(false);
        setLink3(false);
        setLink4(false);
        setLink2(true);
        break;

      case 3:
        setLink1(false);
        setLink2(false);
        setLink4(false);
        setLink3(true);
        break;

      case 4:
        setLink1(false);
        setLink2(false);
        setLink3(false);
        setLink4(true);
        break;

      default:
        break;
    }
  };
  return (
    <section className="componenty">
      <div className={`links ${link1 ? "links-active" : ""}`}>
        <img src={Profile1} alt="" />
        <a onClick={() => linkFunc(1)} className="fs-400 bold clr-black-main">
          Hóspedes
        </a>
      </div>
      <div className={`links ${link2 ? "links-active" : ""}`}>
        <img src={Exchange} alt="" />
        <a onClick={() => linkFunc(2)} className="fs-400 bold clr-black-main">
          Transações
        </a>
      </div>
      <div className={`links ${link3 ? "links-active" : ""}`}>
        <img src={Cheque} alt="" />
        <Link
          to="/47"
          onClick={() => linkFunc(3)}
          className="fs-400 bold clr-black-main"
        >
          Despesas
        </Link>
      </div>
      <div className={`links ${link4 ? "links-active" : ""}`}>
        <img src={Maintenance} alt="" />
        <a onClick={() => linkFunc(4)} className="fs-400 bold clr-black-main">
          Reparações
        </a>
      </div>
    </section>
  );
};

export default ComponentY;
