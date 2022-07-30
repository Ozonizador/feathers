import React from "react";

import { Rating } from "flowbite-react/lib/esm/components";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
const RoomRating = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <section className="mb-8">
      {advertisement.reviews && advertisement.reviews.length !== 0 && (
        <>
          <Rating>
            <p className="mr-5 text-5xl font-medium text-secondary-500">4.71</p>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
          <p className="my-5 text-2xl font-medium text-secondary-500">5 comentários</p>
          <hr />

          <div className="flex flex-row  gap-16">
            {/* COL 1 */}
            <div className="mt-8 flex flex-col">
              <div className="flex flex-row">
                <div className="w-52 text-xl font-bold">Localização</div>
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>

              <div className="my-4 flex flex-row">
                <div className="w-52 text-xl font-bold">Qualidade - preço</div>
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>

              <div className="flex flex-row">
                <div className="w-52 text-xl font-bold">Comodidades</div>
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>

            {/* COL 2 */}
            <div className="mt-8 flex flex-col">
              <div className="flex flex-row">
                <div className="w-52 text-xl font-bold">Senhorio</div>
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>

              <div className="my-4 flex flex-row">
                <div className="w-52 text-xl font-bold">Avaliação Geral</div>
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
          </div>
        </>
      )}
      {(!advertisement.reviews || advertisement.reviews.length === 0) && (
        <>
          <div>Não há reviews para este anuncio</div>
        </>
      )}
    </section>
  );
};

export default RoomRating;
