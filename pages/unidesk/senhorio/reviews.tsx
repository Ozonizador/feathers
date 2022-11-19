import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import ReviewInfo from "../../../components/unidesk/Senhorio/Reviews/ReviewInfo/ReviewInfo";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

//
import IconReviews from "../../../public/images/icon-pg37-1.svg";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";
import { UNIDESK_URL } from "../../../models/paths";

const breadcrumbPaths = [
  { url: UNIDESK_URL, label: "Anúncios" },
  { url: "", label: "Detalhes dos Anúncios" },
] as BreadcrumbPath[];

const reviews = () => {
  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} icon={IconReviews} />
      <div className="mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300 px-0  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden p-5 lg:block lg:border-r lg:p-12">
            <MenuSenhorio />
          </div>
          <div className="mx-auto w-full lg:ml-20 lg:pr-10">
            <ReviewInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default reviews;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
