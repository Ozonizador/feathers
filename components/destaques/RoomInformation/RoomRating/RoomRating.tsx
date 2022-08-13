import React, { useCallback, useEffect, useState } from "react";

import { Rating } from "flowbite-react/lib/esm/components";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { getAveragesByAdvertisementId } from "../../../../services/reviewService";
import { AdvertisementReviewSummary } from "../../../../models/review";

const RoomRating = () => {
  const advertisement = useGetSingleAdvertisement();
  const [roomAverages, setRoomAverages] = useState<AdvertisementReviewSummary | null>(null);

  const getRoomAverages = useCallback(async () => {
    if (advertisement) {
      const { data, error } = await getAveragesByAdvertisementId(advertisement.id);
      if (!error) {
        setRoomAverages(data);
      }
    }
  }, [advertisement]);

  const averageOfAll = () => {
    if (roomAverages) {
      return (
        (roomAverages.comoditiesAverage +
          roomAverages.landlordAverage +
          roomAverages.locationAverage +
          roomAverages.overallAverage +
          roomAverages.valueQualityAverage) /
        5
      );
    }
    return 0;
  };

  useEffect(() => {
    getRoomAverages();
  }, [getRoomAverages]);

  return (
    <section className="mb-8">
      {roomAverages && roomAverages.reviewNumber !== 0 && (
        <>
          <Rating>
            <p className="mr-5 text-5xl font-medium text-secondary-500">{averageOfAll().toFixed(2)}</p>
            <Rating.Star filled={averageOfAll() >= 1 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 2 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 3 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 4 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 5 ? true : false} />
          </Rating>
          <p className="my-5 text-2xl font-medium text-secondary-500">{roomAverages.reviewNumber} comentários</p>
          <hr />

          <div className="flex flex-row gap-16">
            {/* COL 1 */}
            <div className="mt-8 flex flex-col">
              <div className="flex flex-row">
                <div className="w-44 text-xl font-bold">Localização</div>
                <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                  {roomAverages.locationAverage.toFixed(2)}
                </p>
                <Rating>
                  <Rating.Star filled={roomAverages.locationAverage >= 1 ? true : false} />
                  <Rating.Star filled={roomAverages.locationAverage >= 2 ? true : false} />
                  <Rating.Star filled={roomAverages.locationAverage >= 3 ? true : false} />
                  <Rating.Star filled={roomAverages.locationAverage >= 4 ? true : false} />
                  <Rating.Star filled={roomAverages.locationAverage >= 5 ? true : false} />
                </Rating>
              </div>

              <div className="my-4 flex flex-row">
                <div className="w-44 text-xl font-bold">Qualidade - preço</div>
                <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                  {roomAverages.valueQualityAverage.toFixed(2)}
                </p>
                <Rating>
                  <Rating.Star filled={roomAverages.valueQualityAverage >= 1 ? true : false} />
                  <Rating.Star filled={roomAverages.valueQualityAverage >= 2 ? true : false} />
                  <Rating.Star filled={roomAverages.valueQualityAverage >= 3 ? true : false} />
                  <Rating.Star filled={roomAverages.valueQualityAverage >= 4 ? true : false} />
                  <Rating.Star filled={roomAverages.valueQualityAverage >= 5 ? true : false} />
                </Rating>
              </div>

              <div className="flex flex-row">
                <div className="w-44 text-xl font-bold">Comodidades</div>
                <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                  {roomAverages.comoditiesAverage.toFixed(2)}
                </p>
                <Rating>
                  <Rating.Star filled={roomAverages.comoditiesAverage >= 1 ? true : false} />
                  <Rating.Star filled={roomAverages.comoditiesAverage >= 2 ? true : false} />
                  <Rating.Star filled={roomAverages.comoditiesAverage >= 3 ? true : false} />
                  <Rating.Star filled={roomAverages.comoditiesAverage >= 4 ? true : false} />
                  <Rating.Star filled={roomAverages.comoditiesAverage >= 5 ? true : false} />
                </Rating>
              </div>
            </div>

            {/* COL 2 */}
            <div className="mt-8 flex flex-col">
              <div className="flex flex-row">
                <div className="w-44 text-xl font-bold">Senhorio</div>
                <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                  {roomAverages.landlordAverage.toFixed(2)}
                </p>
                <Rating>
                  <Rating.Star filled={roomAverages.landlordAverage >= 1 ? true : false} />
                  <Rating.Star filled={roomAverages.landlordAverage >= 2 ? true : false} />
                  <Rating.Star filled={roomAverages.landlordAverage >= 3 ? true : false} />
                  <Rating.Star filled={roomAverages.landlordAverage >= 4 ? true : false} />
                  <Rating.Star filled={roomAverages.landlordAverage >= 5 ? true : false} />
                </Rating>
              </div>

              <div className="my-4 flex flex-row">
                <div className="w-44 text-xl font-bold">Avaliação Geral</div>
                <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                  {roomAverages.overallAverage.toFixed(2)}
                </p>
                <Rating>
                  <Rating.Star filled={roomAverages.overallAverage >= 1 ? true : false} />
                  <Rating.Star filled={roomAverages.overallAverage >= 2 ? true : false} />
                  <Rating.Star filled={roomAverages.overallAverage >= 3 ? true : false} />
                  <Rating.Star filled={roomAverages.overallAverage >= 4 ? true : false} />
                  <Rating.Star filled={roomAverages.overallAverage >= 5 ? true : false} />
                </Rating>
              </div>
            </div>
          </div>
        </>
      )}
      {!roomAverages && (
        <>
          <div>Não há reviews para este anuncio</div>
        </>
      )}
    </section>
  );
};

export default RoomRating;
