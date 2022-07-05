import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Input from "../utils/Input";
import Image from "next/image"
import QuantityInput from "../utils/QuantityInput"
import { BiBed } from 'react-icons/bi';
import { MdPeopleOutline } from 'react-icons/md';
import { MdOutlineBathtub } from 'react-icons/md';
import { GiPersonInBed } from 'react-icons/gi';

const FormPasso2 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="my-20 px-40  w-1/2 ">
      <div className="flex items-center my-8">
        <div className="flex items-center">
          <MdPeopleOutline className="text-2xl" />
          {/* <Image
            src="/images/anunciar_capacidade.jpg"
            alt=""
            height="25"
            width="25"
          ></Image> */}
        </div>
        <div className="w-3/5">
          <h2 className="font-bold text-base ml-2  align-middle">Capacidade</h2>
        </div>
        <div>
          <QuantityInput />
        </div>
      </div>


      <div className="flex my-8">
        <div className="flex items-center">
          <BiBed className="text-2xl" />
          {/* <Image
            src="/images/anunciar_camas.jpg"
            alt=""
            height="25"
            width="25"
          ></Image> */}
        </div>
        <div className="w-3/5">
          <h2 className="font-bold text-base ml-2  align-middle">Camas</h2>
        </div>
        <div>
          <QuantityInput />
        </div>
      </div>


      <div className="flex my-8">
        <div className="flex">
          <GiPersonInBed className="text-2xl" />
          {/* <Image
            src="/images/anunciar_quartos.jpg"
            alt=""
            height="25"
            width="25"
          ></Image> */}
        </div>
        <div className="w-3/5">
          <h2 className="font-bold text-base ml-2  align-middle">Quartos</h2>
        </div>
        <div>
          <QuantityInput />
        </div>
      </div>



      <div className="flex my-8">
        <div className="flex items-center">
          <MdOutlineBathtub className="text-2xl" />
          {/* <Image
            src="/images/anunciar_casas_de_banho.jpg"
            alt=""
            height="25"
            width="25"
          ></Image> */}
        </div>
        <div className="w-3/5">
          <h2 className="font-bold text-base ml-2  align-middle">Casas de Banho</h2>
        </div>
        <div>
          <QuantityInput />
        </div>
      </div>

      <button
        type="button"
        className="mt-12 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>



    </section>
  );
};

export default FormPasso2;
