import { Database } from "../database.types";

export const BLOG_TABLE_NAME = "blogs";

export type BlogsResponse = Database["public"]["Tables"]["blogs"];
export type Blog = BlogsResponse["Row"];

export const BLOG_PROPERTIES = {
  CATEGORY: "category",
  ID: "id",
  SLUG: "slug",
} as const;

export const BlogCategoryLabel = {
  LANDLORD: "landlord",
  TENANT: "student",
};
