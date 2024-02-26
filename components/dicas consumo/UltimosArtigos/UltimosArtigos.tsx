import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Blog } from "../../../models/blog";
import useBlogService from "../../../hooks/blogService";
import { UserTypes } from "../../../models/profile";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { pt, enGB } from "date-fns/locale";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
interface UltimosArtigosProps {
  slug: string;
  category: UserTypes;
}

const UltimosArtigos = ({ slug, category }: UltimosArtigosProps) => {
  const router = useRouter();
  const { getSimilarBlogPosts } = useBlogService();
  const [similarBlogs, setSimilarBlogs] = useState<Blog[]>([]);

  const getSimilarPosts = useCallback(async () => {
    const { data, error } = await getSimilarBlogPosts(category, slug);
    if (!error && data) {
      setSimilarBlogs(data);
    }
  }, [category, slug]);

  useEffect(() => {
    getSimilarPosts();
  }, [getSimilarPosts]);

  return (
    <section>
      <div className="container mx-auto mb-32 px-8 lg:px-32">
        <div className="mb-11 text-4xl font-bold">Últimos artigos</div>
        <div className="flex  w-full flex-col gap-5 lg:flex lg:flex-row lg:justify-between lg:gap-12">
          {similarBlogs &&
            similarBlogs.map((blog, index) => {
              return (
                <Link href={`/blog/${blog.slug}`} key={index} className="flex flex-1 flex-col">
                  <div className="relative block h-[350px] w-full  px-4 lg:flex lg:h-[350px] lg:w-full">
                    <Image className="rounded-lg" src={blog.image} alt="" fill style={{ objectFit: "cover" }}></Image>
                  </div>
                  <div className="my-4 w-full  text-xl lg:w-full lg:text-xl">{blog.title}</div>
                  <div className="line-clamp-5 w-full lg:w-full  lg:text-base">
                    <ReactMarkdown>{blog.description}</ReactMarkdown>
                  </div>

                  <div className="mb-10 mt-5 flex w-full justify-between text-sm text-gray-400 lg:mb-0 lg:mt-10 lg:w-full">
                    <div className="capitalize">
                      {format(parseISO(blog.created_at), "dd MMMM yyyy", {
                        locale: router.locale === "pt" ? pt : enGB,
                      })}
                    </div>
                    <div>By Unihosts</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UltimosArtigos;
