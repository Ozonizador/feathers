import BlogCards from "../components/blog/BlogCards/BlogCards";
import BlogHero from "../components/blog/BlogHero/BlogHero";

import Image from "next/image";
import notification from "../public/images/notification.png";
import { Blog, BlogCategoryLabel } from "../models/blog";
import { useCallback, useEffect, useState } from "react";
import useBlogService from "../services/blogService";
import { UserTypes } from "../models/profile";
import { Spinner } from "flowbite-react";

{
  /* page 9 XD */
}
const Index = () => {
  const categories = ["LANDLORD", "TENANT"] as UserTypes[];
  const [category, setCategory] = useState<UserTypes>("LANDLORD");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { getBlogs } = useBlogService();
  const getBlogPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getBlogs(category, 5);
    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  return (
    <>
      <section className="container mx-auto pt-20 pb-5">
        <div className="flex flex-col items-center justify-center align-middle lg:flex-row lg:justify-between">
          <div className="text-center text-3xl font-bold lg:text-left lg:text-6xl">Pertence Onde Tu Quiseres!</div>
          <div className="flex h-5 w-full items-center lg:w-44 ">
            <select
              className="mt-24 w-full  rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:mt-0 lg:w-44"
              placeholder="Categoria"
              onChange={(e) => setCategory(e.target.value as UserTypes)}
            >
              {categories.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {BlogCategoryLabel[option]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </section>
      {loading && (
        <div className="flex justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && (
        <>
          <BlogHero blogs={blogs.slice(0, 3)} />
          <BlogCards blogs={blogs.slice(3)} />
        </>
      )}
      <>
        <div className="container mx-auto">
          <div className="mx-auto mt-14 mb-44 flex flex-col items-center justify-center rounded-2xl  bg-primary-100 py-5 text-center align-middle  lg:w-4/6 lg:flex-row lg:text-left">
            <div className="alert alert-warning con ml-3" role="alert">
              <Image className="h-10" src={notification} alt="" />
            </div>

            <div className="ml-6 text-xl">Receba notificações sempre que houver novidades por aqui</div>
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
