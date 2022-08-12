import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";

const Procurar = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center  lg:flex-row">
        <SearchInputField />
      </div>
      <div className="mt-10">
        <ProcurarSection />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default Procurar;
