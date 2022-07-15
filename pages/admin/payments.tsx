import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Payments from "../../components/admin/Payments";

const Index = () => {
  return <Payments />;
};

export default Index;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
