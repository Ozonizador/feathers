import {
  Review,
  Reviews,
  ReviewsAverageView,
  REVIEWS_AVERAGE_TABLE_VIEW,
  REVIEWS_TABLE_NAME,
  REVIEW_COLUMNS,
} from "../models/review";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useReviewService = () => {
  const supabaseClient = useSupabaseClient();

  const addReview = async (review: Omit<Review, "created_at" | "updated_at">, reservationId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
      .insert({ ...review, reservation_id: reservationId })
      .select()
      .single();

    const { data: updateReservation, error: reservationError } = await supabaseClient
      .from("reservations")
      .update({ payment_status: "PAID", status: "ACCEPTED" })
      .eq("id", reservationId)
      .select(
        "*, tenant:tenant_id(*), advertisements(host:host_id(*), street, street_number, postal_code, place, month_rent, extra_per_host, expenses)"
      );

    if (updateReservation) {
      // send email
      let included = "Despesas Incluídas";

      for (let expense of updateReservation[0].advertisements.expenses.services) {
        if (expense.included == "PARTIALLY" && included == "INCLUDED") included = "Despesas Parcialmente incluídas";
        if (expense.included == "EXCLUDED") included = "Despesas excluídas";
      }

      let formData = {
        email: updateReservation[0].reservation.advertisement.host.email,
        templateId: "",
        data: {
          first_name: updateReservation[0].reservation.advertisement.host.name,
          accommodation_name: updateReservation[0].advertisements.title,
          entry_date: new Date(updateReservation[0].start_date).toLocaleDateString(),
          departure_date: new Date(updateReservation[0].end_date).toLocaleDateString(),
          private_review: review.private_review,
          public_review: review.public_review,
          link: `unidesk/senhorio/reviews`,
        },
      };

      await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    }

    return { data, error };
  };

  const getReviews = async () => {
    const { data, error } = await supabaseClient.from<"reviews", Reviews>(REVIEWS_TABLE_NAME).select();
    return { data, error };
  };

  const getReviewsByAdvertId = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertId);

    return { data, error };
  };

  const getReviewsByHostId = async (hostId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
      .select("*, advertisement:advertisements(id,host_id), tenant:tenant_id(*)")
      .eq(REVIEW_COLUMNS.HOST_ID, hostId)
      .order(REVIEW_COLUMNS.CREATED_AT, { ascending: false });

    return { data, error };
  };

  /*
   * Average Rating Table Reviews
   */

  const getAveragesByAdvertisementId = async (advertisement_id: string) => {
    const { data, error } = await supabaseClient
      .from<"reviewsPerAdvertisement", ReviewsAverageView>(REVIEWS_AVERAGE_TABLE_VIEW)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertisement_id)
      .single();

    return { data, error };
  };

  return {
    addReview,
    getAveragesByAdvertisementId,
    getReviewsByHostId,
    getReviewsByAdvertId,
    getReviews,
  };
};

export default useReviewService;
