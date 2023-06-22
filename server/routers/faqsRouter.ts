import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";
import { Faq, Faqs, FAQS_TABLE_NAME } from "../../models/faq";
import { superAdminProcedure } from "../procedure";
import { publicProcedure, router } from "../trpc";

const AddFaqSchema: z.ZodType<Pick<Faq, "answer" | "question" | "type">> = z.object({
  answer: z.string(),
  question: z.string(),
  type: z.enum(["LANDLORD", "TENANT"]),
});

export const faqsRouter = router({
  getFaqs: publicProcedure.query(async () => {
    const { data, error } = await supabaseAdmin.from<"faqs", Faqs>(FAQS_TABLE_NAME).select();

    return { data, error };
  }),
  addFaq: superAdminProcedure.input(AddFaqSchema).mutation(async ({ input }) => {
    const { data, error } = await supabaseAdmin.from<"faqs", Faqs>(FAQS_TABLE_NAME).insert(input);

    return { data, error };
  }),
  editFaq: superAdminProcedure.input(z.object({ faq: AddFaqSchema, faqId: z.string() })).mutation(async ({ input }) => {
    const { faqId, faq } = input;
    const { data, error } = await supabaseAdmin.from<"faqs", Faqs>(FAQS_TABLE_NAME).update(faq).eq("id", faqId);

    return { data, error };
  }),
  removeFaq: superAdminProcedure.input(z.object({ faqId: z.string() })).mutation(async ({ input }) => {
    const { faqId } = input;
    const { data, error } = await supabaseAdmin.from<"faqs", Faqs>(FAQS_TABLE_NAME).delete().eq("id", faqId);

    return { data, error };
  }),
});

// export type definition of API
export type FaqsRouter = typeof faqsRouter;
