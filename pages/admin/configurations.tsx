import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Configurations from "../../components/admin/Configurations";

const Index = () => {
  return (
    <>
      <Configurations />
    </>
  );
};

export default Index;

export const getServerSideProps = async withPageAuth({
  params,
  redirectTo: "/auth/login"
}: GetStaticPropsContext<PageParams>): Promise<GetServerSidePropsResult<JobPageProps>> => {
  const slug = params?.slug;

  /* Not Found */
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const { data: job, error } = await supabase
    .from<FetchedJob>(JOBS_TITLE_NAME)
    .select(`*, dao:${JOBS_TABLE.ORG_ID}(*)`)
    .eq(JOBS_TABLE.SLUG, slug)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch static DAO data for, slug: ${slug}`, error.message);
  }

  if (job) {
    return {
      props: { job },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
