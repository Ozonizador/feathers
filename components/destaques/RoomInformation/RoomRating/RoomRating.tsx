import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Rating } from "flowbite-react/lib/esm/components";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import useReviewService from "../../../../hooks/reviewService";
import { AdvertisementReviewSummary, Review } from "../../../../models/review";
import Button from "../../../utils/Button";
import { Profile } from "../../../../models/profile";
import { averageOfArrayNumbers } from "../../../../utils/utils";

interface RoomRatingProps {
  activateModal: () => void;
}

const RoomRating = ({ activateModal }: RoomRatingProps) => {
  const [roomAverages, setRoomAverages] = useState<AdvertisementReviewSummary | null>(null);
  const { getAveragesByAdvertisementId } = useReviewService();
  const advertisement = useGetSingleAdvertisement();
  const { stays } = advertisement;

  const getRoomAverages = useCallback(async () => {
    if (advertisement) {
      const { data, error } = await getAveragesByAdvertisementId(advertisement.id);
      if (!error) {
        setRoomAverages(data);
      }
    }
  }, [advertisement]);

  const averageOfAll = () => {
    if (!roomAverages) return 0;

    const averages = [
      roomAverages.comodities_average,
      roomAverages.landlord_average,
      roomAverages.location_average,
      roomAverages.overall_average,
      roomAverages.value_quality_average,
    ];

    return averageOfArrayNumbers(averages);
  };

  useEffect(() => {
    getRoomAverages();
  }, [getRoomAverages]);

  debugger;
  return (
    <section className="mb-8">
      {roomAverages && roomAverages.review_number !== 0 && (
        <div className="flex flex-col gap-5">
          <Rating size="lg">
            <p className="mr-5 text-5xl font-medium text-secondary-500">{averageOfAll().toFixed(2)}</p>
            <Rating.Star filled={averageOfAll() >= 1 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 2 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 3 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 4 ? true : false} />
            <Rating.Star filled={averageOfAll() >= 5 ? true : false} />
          </Rating>
          <p className="text-xl font-medium text-secondary-500 lg:text-2xl">{roomAverages.review_number} comentários</p>
          <hr />

          <div className="mt-3 flex flex-col gap-5 md:grid md:grid-cols-2">
            {/* COL 1 */}
            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">Localização</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${roomAverages.location_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={roomAverages.location_average >= 1 ? true : false} />
                <Rating.Star filled={roomAverages.location_average >= 2 ? true : false} />
                <Rating.Star filled={roomAverages.location_average >= 3 ? true : false} />
                <Rating.Star filled={roomAverages.location_average >= 4 ? true : false} />
                <Rating.Star filled={roomAverages.location_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">Qualidade - preço</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${roomAverages.value_quality_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={roomAverages.value_quality_average >= 1 ? true : false} />
                <Rating.Star filled={roomAverages.value_quality_average >= 2 ? true : false} />
                <Rating.Star filled={roomAverages.value_quality_average >= 3 ? true : false} />
                <Rating.Star filled={roomAverages.value_quality_average >= 4 ? true : false} />
                <Rating.Star filled={roomAverages.value_quality_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">Comodidades</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${roomAverages.comodities_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={roomAverages.comodities_average >= 1 ? true : false} />
                <Rating.Star filled={roomAverages.comodities_average >= 2 ? true : false} />
                <Rating.Star filled={roomAverages.comodities_average >= 3 ? true : false} />
                <Rating.Star filled={roomAverages.comodities_average >= 4 ? true : false} />
                <Rating.Star filled={roomAverages.comodities_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">Senhorio</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${roomAverages.landlord_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={roomAverages.landlord_average >= 1 ? true : false} />
                <Rating.Star filled={roomAverages.landlord_average >= 2 ? true : false} />
                <Rating.Star filled={roomAverages.landlord_average >= 3 ? true : false} />
                <Rating.Star filled={roomAverages.landlord_average >= 4 ? true : false} />
                <Rating.Star filled={roomAverages.landlord_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">Avaliação Geral</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${roomAverages.overall_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={roomAverages.overall_average >= 1 ? true : false} />
                <Rating.Star filled={roomAverages.overall_average >= 2 ? true : false} />
                <Rating.Star filled={roomAverages.overall_average >= 3 ? true : false} />
                <Rating.Star filled={roomAverages.overall_average >= 4 ? true : false} />
                <Rating.Star filled={roomAverages.overall_average >= 5 ? true : false} />
              </Rating>
            </div>
          </div>
          {stays && stays.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {stays.slice(0, 3).map((stay, index) => {
                  const review = stay.reviews && stay.reviews[0];
                  return <ReviewCard review={review} tenant={stay.tenant} key={index} />;
                })}
              </div>
              <div className="mx-auto flex w-1/2 justify-center">
                <Button type="button" onClick={activateModal}>
                  Ver todos os comentários
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {!roomAverages && (
        <>
          <div>Não há reviews para este anuncio</div>
        </>
      )}
    </section>
  );
};

interface ReviewCardProps {
  review: Omit<Review, "private_review" | "stay_id" | "updated_at">;
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
}

const ReviewCard = ({ review, tenant }: ReviewCardProps) => {
  const ratings = [
    review.comodities_rating,
    review.landlord_rating,
    review.location_rating,
    review.overall_rating,
    review.value_quality_rating,
  ];

  const averageRating = averageOfArrayNumbers(ratings) || 0;
  return (
    <>
      <div key={review.id} className="flex flex-col gap-5 rounded-lg border border-terciary-200 p-4">
        <div className="flex gap-5">
          <div>
            <Avatar
              alt="Hóspede"
              img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              rounded={true}
              size="sm"
            />
          </div>
          <div className="my-auto">{`${tenant.name} ${tenant.surname}`}</div>
          <div className="my-auto ml-auto text-secondary-400">{averageRating.toFixed(2)}</div>
          <Rating>
            <Rating.Star filled={averageRating >= 1 ? true : false} />
            <Rating.Star filled={averageRating >= 2 ? true : false} />
            <Rating.Star filled={averageRating >= 3 ? true : false} />
            <Rating.Star filled={averageRating >= 4 ? true : false} />
            <Rating.Star filled={averageRating >= 5 ? true : false} />
          </Rating>
        </div>
        <div className="text-justify">{review.public_review}</div>
      </div>
    </>
  );
};

export default RoomRating;
