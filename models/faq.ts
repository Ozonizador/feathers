import { Database } from "../database.types";

export const FAQS_TABLE_NAME = "faqs" as const;

export type Faqs = Database["public"]["Tables"]["faqs"];
export type Faq = Faqs["Row"];
