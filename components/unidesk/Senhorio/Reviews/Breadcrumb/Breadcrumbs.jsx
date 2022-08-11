// pag 58
import Image from "next/image"

import IconReviews from "../../../../../public/images/icon-pg37-1.svg"

const Breadcrumbs = () => {
    return (
        <div className="flex items-center mx-auto my-20 w-11/12 px-0  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
            <div>
                <Image src={IconReviews} alt="Favoritos" height={55} width={55} />
            </div>
            <div className="ml-4 text-xl ">{"Anúncios > Detalhes dos Anúncios"}</div>
        </div>
    );
};

export default Breadcrumbs;