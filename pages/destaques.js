import React from "react";

import DestaquesSection from "../components/destaques/DestaquesSection/DestaquesSection";
import SearchInputField from "../components/search/SearchInputField";

const Destaques = () => {
  return (
    <>
      <div className="flex flex-1 justify-center">
        <SearchInputField />
      </div>
      <DestaquesSection />
    </>
  );
};

export default Destaques;
