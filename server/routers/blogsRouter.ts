import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Blog, BlogsResponse, BLOG_TABLE_NAME } from "../../models/blog";
import { createRandomUniqWord } from "../../utils/utils";
import { superAdminProcedure } from "../procedure";
import { publicProcedure, router } from "../trpc";

const AddBlogSchema: z.ZodType<Pick<Blog, "category" | "title" | "description" | "image">> = z.object({
  description: z.string(),
  title: z.string(),
  category: z.enum(["LANDLORD", "TENANT"]),
  image: z.string()
});

export const blogsRouter = router({
  getBlogs: publicProcedure.query(async () => {
    const { data, error } = await supabaseAdmin.from<"blogs", BlogsResponse>(BLOG_TABLE_NAME).select();

    return { data, error };
  }),
  addBlogPost: superAdminProcedure.input(AddBlogSchema).mutation(async ({ input }) => {
    const { data, error } = await supabaseAdmin
      .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
      .insert({ ...input, slug: createRandomUniqWord(), image: "" });

    return { data, error };
  }),
  updateBlogPost: superAdminProcedure
    .input(z.object({ blog: AddBlogSchema, blogId: z.string() }))
    .mutation(async ({ input }) => {
      const { blog, blogId } = input;
      const { data, error } = await supabaseAdmin
        .from<"blogs", BlogsResponse>(BLOG_TABLE_NAME)
        .update({ ...blog })
        .eq("id", blogId);

      return { data, error };
    }),
});

// export type definition of API
export type BlogRouter = typeof blogsRouter;
