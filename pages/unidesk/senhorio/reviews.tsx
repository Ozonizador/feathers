import BreadCrumbs from "../../../components/unidesk/Senhorio/Reviews/Breadcrumb/Breadcrumbs";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import ReviewInfo from "../../../components/unidesk/Senhorio/Reviews/ReviewInfo/ReviewInfo";

const reviews = () => {
  return (
    <>
      <BreadCrumbs />
      <div className="mx-auto my-20 flex w-4/6 rounded-2xl border border-terciary-700 bg-terciary-300 py-12 px-12">
        <div>
          <MenuSenhorio />
        </div>
        <div className="ml-20 w-full">
          <ReviewInfo />
        </div>
      </div>
    </>
  );
};

export default reviews;
