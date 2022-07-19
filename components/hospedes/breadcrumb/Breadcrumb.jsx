/* PAGINA 60 DO XD */
import Image from "next/image"
import IconAHospedes from "../../../public/images/icon-pg37-1.svg"

const Breadcrumb = () => {
    return (
        <div className=" mx-auto mt-24 flex w-4/6 items-center align-middle">
            <div>
                <Image src={IconAHospedes} alt="Favoritos" height={55} width={55} />
            </div>
            <div className="ml-4 text-xl ">{"Hóspedes"}</div>
        </div>
    );
};

export default Breadcrumb;