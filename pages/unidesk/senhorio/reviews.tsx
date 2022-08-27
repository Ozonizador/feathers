import BreadCrumbs from "../../../components/unidesk/Senhorio/Reviews/Breadcrumb/Breadcrumbs";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import ReviewInfo from "../../../components/unidesk/Senhorio/Reviews/ReviewInfo/ReviewInfo";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const reviews = () => {
  return (
    <>
      <BreadCrumbs />
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

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
