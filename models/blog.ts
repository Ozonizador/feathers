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

export enum BlogCategory {
  LANDLORD = "LANDLORD",
  TENANT = "TENANT",
}
