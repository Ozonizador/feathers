import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdminClient";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../../models/profile";
import { trpc } from "../../../utils/trpc";

const BlogSuperAdminPage = () => {
  return <>Hello</>;
};

export default BlogSuperAdminPage;

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
  const { data, error } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  if (error || !data || data.user_type !== "ADMIN")
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
