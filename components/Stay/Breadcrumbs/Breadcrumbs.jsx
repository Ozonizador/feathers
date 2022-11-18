import Image from "next/image";
import IconStay from "../../../public/images/icon-profile.svg";

const Breadcrumbs = () => {
  return (
    <div className="container mx-auto my-20 mt-24 flex w-11/12 items-center pl-0 align-middle lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div>
        <Image src={IconStay} alt="Favoritos" height={55} width={55} />
      </div>
      <div className="ml-4 text-xl ">{"Perfil > Conta > Informações pessoais"}</div>
    </div>
  );
};

export default Breadcrumbs;
