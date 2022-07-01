import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import MainMenu from "../../components/admin/MainMenu";

const Index = () => {
  return <MainMenu />;
};

export default Index;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
