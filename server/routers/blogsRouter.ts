import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../models/blog";
import { createRandomUniqWord } from "../../utils/utils";
import { superAdminProcedure } from "../procedure";
import { router } from "../trpc";

const AddBlogSchema: z.ZodType<Pick<Blog, "category" | "title" | "description">> = z.object({
  description: z.string(),
  title: z.string(),
  category: z.enum(["LANDLORD", "TENANT"]),
});

export const blogsRouter = router({
  // TODO: missing image and logic for that
  addBlogPost: superAdminProcedure.input(AddBlogSchema).mutation(async ({ input, ctx }) => {
    const { data, error } = await supabaseAdmin
      .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
      .insert({ ...input, slug: createRandomUniqWord(), image: "" });

    return { data, error };
  }),
});

// export type definition of API
export type BlogRouter = typeof blogsRouter;
