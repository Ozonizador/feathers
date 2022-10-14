import { Spinner } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { useGetUserType } from "../../../context/MainProvider";
import { Blog } from "../../../models/blog";
import { getBlogs } from "../../../services/blogService";
import Image from "next/image";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function BlogSection() {
  const supabaseClient = useSupabaseClient();
  const { toggleUserType } = useGetUserType();
  const [loading, setLoading] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  const getLatestBlogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getBlogs(supabaseClient, toggleUserType, 4);
    if (!error && data) {
      setBlogPosts(data);
    }

    setLoading(false);
  }, [toggleUserType]);

  useEffect(() => {
    getLatestBlogs();
  }, [getLatestBlogs]);

  return (
    <section className="pb-10">
      {loading && (
        <>
          <Spinner color="info" aria-label="loading" size="lg" />
        </>
      )}
      {!loading && blogPosts && blogPosts.length > 0 && (
        <div>
          <h2 className="my-10 text-5xl font-bold text-black">Blog</h2>
          <div className=" grid gap-8 lg:grid-cols-4">
            {blogPosts.map((blogPost) => {
              return (
                <Link href={`/blog/${blogPost.slug}`} key={blogPost.id}>
                  <a>
                    <article className="relative h-96 w-full rounded-2xl bg-black bg-cover bg-center p-7 duration-200 ease-in hover:drop-shadow-xl lg:w-64">
                      <h2 className="absolute bottom-0 left-0 z-50 mb-6 ml-5 text-2xl text-white lg:text-base">
                        {blogPost.title}
                      </h2>

                      <Image layout="fill" src={blogPost.image} alt="blog" className="opacity-60" objectFit="cover" />
                    </article>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
