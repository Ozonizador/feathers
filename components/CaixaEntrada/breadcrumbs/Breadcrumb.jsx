/* PAGINA 59 DO XD */
import Image from "next/image"
import IconCaixa from "../../../public/images/icon-pg14-3.svg"

const Breadcrumb = () => {
    return (

        <>
            <div className="flex flex-col justify-center align-middle items-center mx-auto mt-24 w-5/6">
                <div className="flex flex-row justify-center items-center align-middle gap-4 w-full">
                    <div className="w-full"><hr /></div>
                    <div><Image className="" src={IconCaixa} alt="Favoritos" height={145} width={145} /></div>
                    <div className="w-full"><hr /></div>
                </div>
                <div className="ml-4 text-xl text-primary-500 font-bold">{"Caixa de Entrada"}</div>
            </div>
        </>
    );
};

export default Breadcrumb;