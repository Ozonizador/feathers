import { Avatar, Rating } from "flowbite-react";
import { Profile } from "../../models/profile";
import { Review } from "../../models/review";
import { averageOfArrayNumbers } from "../../utils/utils";
interface ReviewCardProps {
  review: Omit<Review, "private_review" | "stay_id" | "updated_at">;
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
}

const ReviewCard = ({ review, tenant }: ReviewCardProps) => {
  if (!review) return <></>;
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
            <Avatar alt="Hóspede" img={tenant?.avatar_url || "/icons/user/user.svg"} rounded={true} size="sm" />
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

export default ReviewCard;
