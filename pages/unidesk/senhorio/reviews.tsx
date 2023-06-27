import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import ReviewInfo from "../../../components/unidesk/Senhorio/Reviews/ReviewInfo";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

import IconReviews from "../../../public/images/icon-pg37-1.svg";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";
import { UNIDESK_SENHORIO_PAINEL_URL, UNIDESK_URL } from "../../../models/paths";
import {
  Review,
  Reviews,
  REVIEWS_TABLE_NAME,
  ReviewWithTenantAndAdvertisement,
  REVIEW_COLUMNS,
} from "../../../models/review";
import { PAGE_NUMBER_COUNT } from "../../../hooks/advertisementService";
import { Conversations, CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../../../models/conversation";

const breadcrumbPaths = [
  { url: UNIDESK_URL, label: "Uni-Desk" },
  { url: UNIDESK_SENHORIO_PAINEL_URL, label: "Anúncios" },
  { url: "", label: "Detalhes dos Anúncios" },
] as BreadcrumbPath[];

interface ReviewsPageProps {
  latestReviews: Review[];
  generalClassification: number;
  responseRate: number;
}

const ReviewsPage = ({ latestReviews, generalClassification, responseRate }: ReviewsPageProps) => {
  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} icon={IconReviews} />
      <div className="mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 px-0  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
        <div className="flex flex-col lg:flex-row">
          <div className="block p-5 lg:border-r lg:p-12">
            <MenuSenhorio />
          </div>
          <div className="mx-auto w-full lg:ml-20 lg:pr-10">
            <ReviewInfo
              latestReviews={latestReviews as ReviewWithTenantAndAdvertisement[]}
              generalClassification={generalClassification}
              responseRate={responseRate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const user = session.user;

  const { data: latestReviews, error: reviewsError } = await supabase
    .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
    .select("*, advertisement:advertisements(id,host_id), tenant:tenant_id(*)")
    .eq(REVIEW_COLUMNS.HOST_ID, user.id)
    .order(REVIEW_COLUMNS.CREATED_AT, { ascending: false })
    .range(0, PAGE_NUMBER_COUNT - 1);

  const { count: allConversations, error: allConversationsError } = await supabase
    .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
    .select()
    .eq(CONVERSATION_PROPERTIES.HOST_ID, user.id);

  const { count: repliedConversation, error: repliedConversationError } = await supabase
    .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
    .select("id, messages!inner(id)")
    .eq(CONVERSATION_PROPERTIES.HOST_ID, user.id);

  // adicionar a classificação geral
  const { data: generalClassification, error: classificationError } = await supabase
    .rpc("average_rating_per_host", { hostid: user.id })
    .single();

  const responseRate =
    (allConversationsError && repliedConversationError) || !allConversations
      ? 0
      : repliedConversation || 0 / allConversations;

  return {
    props: {
      initialSession: session,
      user: session.user,
      latestReviews: reviewsError ? [] : latestReviews,
      generalClassification: classificationError ? 0 : generalClassification,
      responseRate,
    },
  };
};
