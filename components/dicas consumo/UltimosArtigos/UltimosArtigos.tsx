import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Blog } from "../../../models/blog";
import { getSimilarBlogPosts } from "../../../services/blogService";
import { UserTypes } from "../../../models/profile";
import Link from "next/link";

interface UltimosArtigosProps {
  slug: string;
  category: UserTypes;
}

const UltimosArtigos = ({ slug, category }: UltimosArtigosProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [similarBlogs, setSimilarBlogs] = useState<Blog[]>([]);

  const getSimilarPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSimilarBlogPosts(category, slug);
    if (!error && data) {
      setSimilarBlogs(data);
    }

    setLoading(false);
  }, [category, slug]);

  useEffect(() => {
    getSimilarPosts();
  }, [getSimilarPosts]);

  const formatDate = (date: Date) => {
    if (!date) return "";

    const newDate = new Date(date);
    return newDate.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section>
      <div className="container mx-auto mb-32 px-8 lg:px-32">
        <div className="mb-11 text-4xl font-bold">Últimos artigos</div>
        <div className="flex  w-full flex-col gap-5 lg:flex lg:flex-row lg:justify-between lg:gap-12">
          {similarBlogs &&
            similarBlogs.map((blog, index) => {
              return (
                <Link href={`/blog/${blog.slug}`} key={index}>
                  <a className="flex flex-1 flex-col">
                    <div className="relative block h-[350px] w-full  px-4 lg:flex lg:h-[350px] lg:w-full">
                      <Image className="rounded-lg" src={blog.image} alt="" layout="fill" objectFit="cover"></Image>
                    </div>
                    <div className="my-4 w-full  text-xl lg:w-full lg:text-xl">{blog.title}</div>
                    <div className="w-full line-clamp-5 lg:w-full  lg:text-base">{blog.description}</div>

                    <div className="mt-5 mb-10 flex w-full justify-between text-sm text-gray-400 lg:mt-10 lg:mb-0 lg:w-full">
                      <div>{formatDate(blog.created_at)}</div>
                      <div>By Unihosts</div>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UltimosArtigos;
