import React from "react";

import DestaquesSection from "../components/destaques/DestaquesSection/DestaquesSection";
import SearchInputField from "../components/search/SearchInputField";

const Procurar = () => {
  return (
    <>
      <div className="flex flex-1 justify-center">
        <SearchInputField />
      </div>
      <div className="mt-10">
        <DestaquesSection />
      </div>
    </>
  );
};

export default Procurar;
