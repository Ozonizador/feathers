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
        <h1 className="mb-3 mt-10 text-3xl font-semibold lg:mb-7 lg:mt-10">Reviews</h1>
        <p className="mb-12 text-xl text-slate-400 lg:mb-6">Os meus Anúncios</p>
      </div>

      <div className="flex flex-col items-center lg:flex-row">
        <div className="flex h-36 w-60 flex-col items-center justify-center rounded-lg border  border-terciary-500 bg-white align-middle">
          <h1 className="mb-7 text-center text-xl font-bold lg:text-left">Classificação geral</h1>
          <Rating>
            <p className="ml-2 text-xl  text-yellow-300">{generalClassification !== 0 ? generalClassification : "-"}</p>
            <Rating.Star />
          </Rating>
        </div>

        <div className="mt-3 text-center text-xl font-bold lg:ml-7 lg:mt-0 lg:text-left">
          {t("response_rate")}: {responseRate || 0}%
        </div>
      </div>

      <div className="mt-14 flex flex-row items-center justify-center gap-5 align-middle lg:justify-start">
        <div className="text-xl font-bold">Últimas reviews</div>
        <div className="text-secondary-300">Anúncios</div>
      </div>

      {!latestReviews ||
        (latestReviews.length === 0 && (
          <div className="pb-5 text-center lg:text-left">Não existem reviews para mostrar</div>
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
  review: ReviewWithTenantAndAdvertisement;
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
            img={review?.tenant?.avatar_url || "/icons/user/user.svg"}
            rounded={true}
            size="lg"
          />
          <div className="text-base font-bold">{review.tenant?.name}</div>
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
