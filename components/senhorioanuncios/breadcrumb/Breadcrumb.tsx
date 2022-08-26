/* PAGINA 51 DO XD */
import Image from "next/image";
import IconAnuncios from "../../../public/images/icons8_laptop_computer.svg";

const Breadcrumb = () => {
  return (
    <div className=" mx-auto mt-24 flex w-4/6 items-center align-middle">
      <div>
        <Image src={IconAnuncios} alt="Favoritos" height={55} width={55} />
      </div>
      <div className="ml-4 text-xl ">{"Painel"}</div>
    </div>
  );
};

export default Breadcrumb;
