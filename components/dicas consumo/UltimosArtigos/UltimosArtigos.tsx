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
        <div className="flex flex-col gap-3 lg:flex lg:flex-row">
          {similarBlogs &&
            similarBlogs.map((blog, index) => {
              return (
                <Link href={`/blog/${blog.slug}`} key={index}>
                  <a>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-center">
                        <Image src={blog.image} alt="" height="450" width="350" objectFit="cover"></Image>
                      </div>
                      <div className="my-4 w-2/3 text-2xl">{blog.title}</div>
                      <div className="w-full line-clamp-5 lg:w-2/3">{blog.description}</div>

                      <div className="mt-5 mb-10 flex w-full justify-between text-base text-gray-400 lg:mt-10 lg:mb-0 lg:w-4/6">
                        <div>{formatDate(blog.createdAt)}</div>
                        <div>By Unihosts</div>
                      </div>
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
