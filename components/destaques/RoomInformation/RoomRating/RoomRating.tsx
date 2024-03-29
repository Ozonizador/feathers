import React, { useCallback, useEffect, useState } from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import useReviewService from "../../../../hooks/reviewService";
import { AdvertisementReviewSummary } from "../../../../models/review";
import Button from "../../../utils/Button";
import { averageOfArrayNumbers } from "../../../../utils/utils";
import { useSetModalReviews } from "../../../../context/ModalShowProvider";
import ReviewCard from "../../../advertisements/ReviewCard";
import classNames from "classnames";
import { Rating } from "flowbite-react";
import { useTranslation } from "next-i18next";

const RoomRating = () => {
  const { t } = useTranslation();
  const [roomAverages, setRoomAverages] = useState<AdvertisementReviewSummary | undefined>(undefined);
  const advertisement = useGetSingleAdvertisement();
  const { stays } = advertisement || { stays: [] };
  const { getAveragesByAdvertisementId } = useReviewService();
  let setModalReviews = useSetModalReviews();

  const getRoomAverages = useCallback(async () => {
    if (!advertisement) return;
    const { data, error } = await getAveragesByAdvertisementId(advertisement.id);
    if (!error) {
      setRoomAverages(data as AdvertisementReviewSummary);
    }
  }, [advertisement]);

  useEffect(() => {
    getRoomAverages();
  }, [getRoomAverages]);

  return (
    <section className="">
      <RoomAveragesSection averageRatings={roomAverages} />
      {stays && stays.length > 0 && (
        <div className="my-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {stays.slice(0, 3).map((stay, index) => {
              const review = stay.reviews && stay.reviews[0];
              return <ReviewCard review={review} tenant={stay.tenant} key={index} />;
            })}
          </div>
          <div className="mx-auto flex w-1/2 cursor-pointer justify-center">
            <Button type="button" onClick={() => setModalReviews(true)}>
              {t("see_all_comments")}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomRating;

interface RoomAverageSectionProps {
  averageRatings?: AdvertisementReviewSummary;
  showTopSection?: boolean;
}

export const RoomAveragesSection = ({ averageRatings, showTopSection = true }: RoomAverageSectionProps) => {
  const { t } = useTranslation();
  const averageOfAll = () => {
    if (!averageRatings) return 0;

    const averages = [
      averageRatings.comodities_average,
      averageRatings.landlord_average,
      averageRatings.location_average,
      averageRatings.overall_average,
      averageRatings.value_quality_average,
    ];

    return averageOfArrayNumbers(averages);
  };

  return (
    <div>
      {averageRatings && averageRatings.review_number !== 0 && (
        <div className="flex flex-col gap-5">
          {showTopSection && (
            <>
              <Rating size="lg">
                <p className="mr-5 text-5xl font-medium text-secondary-500">{averageOfAll().toFixed(2)}</p>
                <Rating.Star filled={averageOfAll() >= 1 ? true : false} />
                <Rating.Star filled={averageOfAll() >= 2 ? true : false} />
                <Rating.Star filled={averageOfAll() >= 3 ? true : false} />
                <Rating.Star filled={averageOfAll() >= 4 ? true : false} />
                <Rating.Star filled={averageOfAll() >= 5 ? true : false} />
              </Rating>
              <p className="text-xl font-medium text-secondary-500 lg:text-2xl">
                {t("commentsWithCount", { count: averageRatings.review_number })}
              </p>
              <hr />
            </>
          )}

          <div
            className={classNames("mt-3", {
              "flex flex-col gap-5 md:grid md:grid-cols-2": showTopSection,
              "flex flex-col gap-3": !showTopSection,
            })}
          >
            {/* COL 1 */}
            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">{t("location")}</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${averageRatings.location_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={averageRatings.location_average >= 1 ? true : false} />
                <Rating.Star filled={averageRatings.location_average >= 2 ? true : false} />
                <Rating.Star filled={averageRatings.location_average >= 3 ? true : false} />
                <Rating.Star filled={averageRatings.location_average >= 4 ? true : false} />
                <Rating.Star filled={averageRatings.location_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">{t("quality_price")}</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${averageRatings.value_quality_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={averageRatings.value_quality_average >= 1 ? true : false} />
                <Rating.Star filled={averageRatings.value_quality_average >= 2 ? true : false} />
                <Rating.Star filled={averageRatings.value_quality_average >= 3 ? true : false} />
                <Rating.Star filled={averageRatings.value_quality_average >= 4 ? true : false} />
                <Rating.Star filled={averageRatings.value_quality_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">{t("advertisements:amenities")}</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${averageRatings.comodities_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={averageRatings.comodities_average >= 1 ? true : false} />
                <Rating.Star filled={averageRatings.comodities_average >= 2 ? true : false} />
                <Rating.Star filled={averageRatings.comodities_average >= 3 ? true : false} />
                <Rating.Star filled={averageRatings.comodities_average >= 4 ? true : false} />
                <Rating.Star filled={averageRatings.comodities_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">{t("landlord", { count: 1 })}</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${averageRatings.landlord_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={averageRatings.landlord_average >= 1 ? true : false} />
                <Rating.Star filled={averageRatings.landlord_average >= 2 ? true : false} />
                <Rating.Star filled={averageRatings.landlord_average >= 3 ? true : false} />
                <Rating.Star filled={averageRatings.landlord_average >= 4 ? true : false} />
                <Rating.Star filled={averageRatings.landlord_average >= 5 ? true : false} />
              </Rating>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 text-xl font-bold">{t("overall_rating")}</div>
              <p className="my-auto ml-2 mr-3 w-7 font-medium text-secondary-500">
                {`(${averageRatings.overall_average.toFixed(2)})`}
              </p>
              <Rating>
                <Rating.Star filled={averageRatings.overall_average >= 1 ? true : false} />
                <Rating.Star filled={averageRatings.overall_average >= 2 ? true : false} />
                <Rating.Star filled={averageRatings.overall_average >= 3 ? true : false} />
                <Rating.Star filled={averageRatings.overall_average >= 4 ? true : false} />
                <Rating.Star filled={averageRatings.overall_average >= 5 ? true : false} />
              </Rating>
            </div>
          </div>
        </div>
      )}
      {!averageRatings && (
        <>
        </>
      )}
    </div>
  );
};
