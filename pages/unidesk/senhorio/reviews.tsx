import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import ReviewInfo from "../../../components/unidesk/Senhorio/Reviews/ReviewInfo";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

import IconReviews from "../../../public/images/icon-pg37-1.svg";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";
import { UNIDESK_URL } from "../../../models/paths";
import {
  Review,
  Reviews,
  REVIEWS_TABLE_NAME,
  ReviewWithTenantAndAdvertisement,
  REVIEW_COLUMNS,
} from "../../../models/review";
import { PAGE_NUMBER_COUNT } from "../../../hooks/advertisementService";
import { Conversations, CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../../../models/conversation";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { late } from "zod";

const breadcrumbPaths = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "Reviews" },
] as BreadcrumbPath[];

interface ReviewsPageProps {
  latestReviews: Review[];
  generalClassification: number;
  responseRate: number;
}

const ReviewsPage = ({ latestReviews, generalClassification, responseRate }: ReviewsPageProps) => {
  return (
    <section className="">
      <Breadcrumbs paths={breadcrumbPaths} icon={IconReviews} />
      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio activeSection="adverts" activeUrl="reviews" />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <ReviewInfo
            latestReviews={latestReviews as ReviewWithTenantAndAdvertisement[]}
            generalClassification={generalClassification}
            responseRate={responseRate}
          />
        </UnideskStructure.Content>
      </UnideskStructure>
    </section>
  );
};

export default ReviewsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const user = session.user;

  const { data: latestReviews, error: reviewsError } = await supabase
    .from(REVIEWS_TABLE_NAME)
    .select("*, reservation:reservations(id, tenant_id, advertisement:advertisements(id, host_id), tenant:profiles(id, name, avatar_url))")
    .order(REVIEW_COLUMNS.CREATED_AT, { ascending: false })

    let reviewsOfUser: any[] = [];
    latestReviews?.forEach((review) => {
      if (review.reservation.advertisement?.host_id == user.id) {
        reviewsOfUser.push(review)
      }
    })


  // adicionar a classificação geral
  const { data: generalClassification, error: classificationError } = await supabase
    .rpc("average_rating_per_host", { hostid: user.id })
    .single();

    const { count: allConversations, error: allConversationsError } = await supabase
      .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
      .select("count", { count: "exact" })
      .eq(CONVERSATION_PROPERTIES.HOST_ID, user.id);

    const { data: repliedConversation, error: repliedConversationError } = await supabase
      .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
      .select("id, messages!inner(profile_id)")
      .eq(CONVERSATION_PROPERTIES.HOST_ID, user.id);

    const responseRate = (allConversationsError && repliedConversationError) || !allConversations ? 0 : (repliedConversation?.length! / allConversations * 100).toFixed(2);

  return {
    props: {
      initialSession: session,
      user: session.user,
      latestReviews: reviewsError ? [] : reviewsOfUser,
      generalClassification: classificationError ? 0 : generalClassification,
      responseRate: responseRate,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
