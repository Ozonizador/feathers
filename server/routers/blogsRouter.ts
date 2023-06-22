import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Faq, Faqs, FAQS_TABLE_NAME } from "../../models/faq";
import { superAdminProcedure } from "../procedure";
import { router } from "../trpc";

const AddFaqSchema: z.ZodType<Pick<Faq, "answer" | "question" | "type">> = z.object({
  answer: z.string(),
  question: z.string(),
  type: z.enum(["LANDLORD", "TENANT"]),
});

export const blogsRouter = router({
  addBlogPost: superAdminProcedure.input(AddFaqSchema).mutation(async ({ input, ctx }) => {
    const { data, error } = await supabaseAdmin.from<"faqs", Faqs>(FAQS_TABLE_NAME).insert(input);

    return { data, error };
  }),
});

// export type definition of API
export type BlogRouter = typeof blogsRouter;
