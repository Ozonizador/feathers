import { Avatar, Rating } from "flowbite-react";
import { ReviewWithTenantAndAdvertisement } from "../../../../models/review";
import { useTranslation } from "next-i18next";

interface ReviewInfoProps {
  generalClassification: number;
  responseRate: number;
  latestReviews: ReviewWithTenantAndAdvertisement[];
}

const ReviewInfo = ({ responseRate, generalClassification, latestReviews }: ReviewInfoProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mx-auto w-11/12 lg:w-full">
        <h1 className="text-xl font-semibold ">Reviews</h1>
        <p className="text-md mb-12 text-slate-400 lg:my-4">{t("admin:reviews.my_adverts")}</p>
      </div>

      <div className="flex flex-col items-center lg:flex-row">
        <div className="flex h-fit w-60 flex-col items-center justify-center rounded-lg border border-terciary-500  bg-white py-[20px] align-middle">
          <h1 className="mb-4 text-center text-lg font-bold lg:text-left">{t("admin:reviews.main_score")}</h1>
          <Rating>
            <p className="ml-2 text-lg text-yellow-300">{generalClassification !== 0 ? generalClassification : "-"}</p>
            <Rating.Star />
          </Rating>
        </div>

        <div className="mt-3 text-center text-lg font-bold lg:ml-7 lg:mt-0 lg:text-left">
          {t("response_rate")}: {responseRate || 0}%
        </div>
      </div>

      <div className="mt-3 flex flex-row items-center justify-center gap-5 align-middle lg:justify-start">
        <div className="text-xl font-bold">{t("admin:reviews.last_reviews")}</div>
        <div className="text-secondary-300">{t("advertisement", { count: 2 })}</div>
      </div>

      {!latestReviews ||
        (latestReviews.length === 0 && (
          <div className="pb-5 text-center lg:text-left">{t("admin:reviews.no_reviews")}</div>
        ))}
      {/* CARD */}
      {latestReviews &&
        latestReviews.map((review, index) => {
          return <SingleReviewCard review={review} key={index} />;
        })}
    </>
  );
};

export default ReviewInfo;

interface SingleReviewCardPros {
  review: any;
}

const SingleReviewCard = ({ review }: SingleReviewCardPros) => {
  /* For the date on the single review card */
  const formattedCreatedDate = new Date(review.created_at);
  const singleDateDisplayOptions = { year: "numeric", month: "long" } as const;

  return (
    <>
      <div className="mx-auto mb-5 flex w-11/12 flex-col items-center gap-10 rounded-2xl bg-white p-7 lg:mx-0 lg:flex-row">
        <div className="flex w-60 flex-col items-center justify-center align-middle">
          <Avatar
            alt="Default avatar with alt text"
            img={review.reservation.tenant?.avatar_url || "/icons/user/user.svg"}
            rounded={true}
            size="lg"
          />
          <div className="text-base font-bold">{review.reservation.tenant?.name}</div>
        </div>
        <div className="text-base text-secondary-500">
          {review.private_review}
          <div className="mt-2 flex flex-row text-base text-primary-500 lg:justify-end">
            {formattedCreatedDate && formattedCreatedDate.toLocaleDateString(undefined, singleDateDisplayOptions)}
          </div>
        </div>
      </div>
    </>
  );
};
