// pag 58


import Image from "next/image"

import IconReviews from "../../../../../public/icon-pg37-1.svg"

const Breadcrumbs = () => {
    return (
        <div className=" mx-auto mt-24 flex w-4/6 items-center align-middle">
            <div>
                <Image src={IconReviews} alt="Favoritos" height={55} width={55} />
            </div>
            <div className="ml-4 text-xl ">{"Hóspedes"}</div>
        </div>
    );
};

export default Breadcrumbs;