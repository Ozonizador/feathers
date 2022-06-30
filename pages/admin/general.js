import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import General from "../../components/admin/General";

const Index = () => {
  return <General />;
};

export default Index;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
