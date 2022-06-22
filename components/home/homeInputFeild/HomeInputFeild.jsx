import React from "react";


// import "./HomeInputFeild.css";
import Image from "next/image";

const HomeInputFeild = () => {
  // let navigate = useNavigate();
  const routeChange = () => {
    let path = `/4_5`;
    // navigate(path);
  };

  return (
    <div className="input-feild">
      <div className="div1" style={{ position: "relative" }}>
        <input type="text" className="input input1" />
        <p className="p1">
          Encontrar <Image height={32} width={32} src="/images/icon-home1.svg" alt="" /> em...
        </p>
      </div>
      <div className="div2" style={{ position: "relative" }}>
        <input type="text" className="input input2" />
        <p className="p2">
          <Image height={32} width={32} src="/images/icon-arrow-right.svg" alt="" /> Entrada
        </p>
      </div>
      <div className="div3" style={{ position: "relative" }}>
        <input type="text" className="input input3" />
        <p className="p3">
          <Image height={32} width={32} src="/images/icon-arrow-left.svg" alt="" /> Saida
        </p>
      </div>
      <button onClick={routeChange} className="bg-acc transition btn-shadow">
        <Image height={32} width={32} src="/images/icon-search.svg" alt="" />
      </button>
    </div>
  );
};

export default HomeInputFeild;
