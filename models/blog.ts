export const BLOG_TABLE_NAME = "blogs";

export type Blog = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  createdAt: Date;
  updatedAt: Date;
};

export const BLOG_PROPERTIES = {
  CATEGORY: "category",
} as const;

export enum BlogCategory {
  LANDLORD = "LANDLORD",
  TENANT = "TENANT",
}

export const BlogCategoryLabel = {
  LANDLORD: "Senhorio",
  TENANT: "Estudante",
};
