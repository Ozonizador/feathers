/* PAGINA 59 DO XD */
import Image from "next/image";
import IconCaixa from "../../../public/images/icon-pg14-3.svg";

const Breadcrumb = () => {
  return (
    <>
      <div className="mx-auto mt-24 flex w-5/6 flex-col items-center justify-center align-middle">
        <div className="flex w-full flex-row items-center justify-center gap-4 align-middle">
          <div className="w-full">
            <hr />
          </div>
          <div>
            <Image className="" src={IconCaixa} alt="Favoritos" height={145} width={145} />
          </div>
          <div className="w-full">
            <hr />
          </div>
        </div>
        <div className="ml-4 text-xl font-bold text-primary-500">{"Caixa de Entrada"}</div>
      </div>
    </>
  );
};

export default Breadcrumb;
