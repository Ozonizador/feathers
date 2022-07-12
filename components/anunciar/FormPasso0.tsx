import React, { useState } from "react";
import Input from "../utils/Input";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { ADVERTISEMENT_PROPERTIES, TYPE_ADVERTISEMENT } from "../../models/advertisement";

const FormPasso0 = () => {
  const [message, setMessage] = useState("");

  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { type, street, floor, place, streetNumber, postalCode } = advertisement;

    if (!type || !street || !floor || !place || !streetNumber || !postalCode) {
      setMessage("Campos por preencher.");
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="my-20 mx-auto grid grid-cols-2 justify-items-center gap-4">
      <div className="w-3/4">
        <div className="mt-2">
          <label className="block ">Qual o seu tipo de espaço?</label>
          <select
            onChange={(e) =>
              changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.TYPE, e.target.value)
            }
            className="w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3"
          >
            {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
              return (
                <option key={index} value={TYPE_ADVERTISEMENT[type]}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-8">
          <Input
            label="street"
            labelText="Rua"
            value={advertisement.street}
            onChange={(e) =>
              changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.STREET, e.target.value)
            }
          />
        </div>
        <Input
          label="floor"
          labelText="Andar"
          value={advertisement.floor}
          onChange={(e) =>
            changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.FLOOR, e.target.value)
          }
        />

        <div className="mt-1">
          <div className="flex">
            <button
              type="button"
              className="mt-10 flex items-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
              onClick={(e) => nextStep(e)}
            >
              Seguinte &#8594;
            </button>
          </div>
          {message && <div className="text-red-600">{message}</div>}
        </div>
      </div>

      <div className="w-3/4">
        <Input
          label="place"
          labelText="Localidade"
          customCss="icon"
          value={advertisement.place}
          onChange={(e) =>
            changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.PLACE, e.target.value)
          }
        />
        <div className="my-8">
          <Input
            label="street_number"
            labelText="Número"
            value={advertisement.streetNumber}
            onChange={(e) =>
              changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.STREET_NUMBER, e.target.value)
            }
          />
        </div>
        <Input
          label="postal_code"
          labelText="Código Postal"
          value={advertisement.postalCode}
          onChange={(e) =>
            changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.POSTAL_CODE, e.target.value)
          }
        />
      </div>
    </section>
  );
};

export default FormPasso0;
