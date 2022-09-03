import { UserTypes } from "./profile";

export const BLOG_TABLE_NAME = "blogs";

export type Blog = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: UserTypes;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const BLOG_PROPERTIES = {
  CATEGORY: "category",
  ID: "id",
  SLUG: "slug",
} as const;

export const BlogCategoryLabel = {
  LANDLORD: "Senhorio",
  TENANT: "Estudante",
};
