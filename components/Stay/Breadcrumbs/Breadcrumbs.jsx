// pag 20
import Image from "next/image"
import IconStay from "../../../public/images/icon-profile.svg"

const Breadcrumbs = () => {
    return (
        <div className=" mx-auto mt-24 flex w-4/6 items-center align-middle">
            <div>
                <Image src={IconStay} alt="Favoritos" height={55} width={55} />
            </div>
            <div className="ml-4 text-xl ">{"Perfil > Conta > Informações pessoais"}</div>
        </div>
    );
};

export default Breadcrumbs;