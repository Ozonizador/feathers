import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";

const Procurar = () => {
  return (
    <>
      <div className="flex flex-1 justify-center">
        <SearchInputField />
      </div>
      <div className="mt-10">
        <ProcurarSection />
      </div>
    </>
  );
};

export default Procurar;
