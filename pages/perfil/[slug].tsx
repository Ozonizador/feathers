import PicAbout from "../../components/perfil/PicAbout";
import AccordionPerfil from "../../components/perfil/accordioncard/AccordionPerfil";
import PerfilInfo from "../../components/perfil/PerfilInfo";
import { GetServerSidePropsContext } from "next/types";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Profile, ProfilesResponse, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../../models/profile";
import { Advertisement } from "../../models/advertisement";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
{
  /* page 61 - 62 XD */
}

interface IndexProps {
  profile: Profile & { advertisements: Advertisement[] };
}

const Index = ({ profile }: IndexProps) => {
  return (
    <>
      <div className="lg_px-0 mx-auto mt-24 w-full px-6 lg:w-2/3 ">
        <PicAbout profile={profile} />
        <AccordionPerfil profile={profile} />
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };
  }

  const slug = ctx.query?.slug;
  if (!slug) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: profile, error } = await supabase
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("*, advertisements(*)")
    .eq(PROFILE_COLUMNS.SLUG, slug)
    .single();

  if (error || !profile) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      initialSession: session,
      user: session.user,
      profile: profile,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
