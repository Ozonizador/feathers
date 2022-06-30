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

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
