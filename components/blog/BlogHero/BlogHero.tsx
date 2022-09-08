import { Blog } from "../../../models/blog";
import Image from "next/image";
interface BlogHeroProps {
  blogs: Blog[];
}

export default function BlogHero({ blogs }: BlogHeroProps) {
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
    <section className="container mx-auto py-20 ">
      <div className="flex flex-col  justify-between gap-14  lg:flex-row">
        {blogs &&
          blogs.map((blog, index) => {
            return (
              <article className=" relative h-96 w-full  rounded-3xl  bg-black px-7 lg:w-2/6" key={index}>
                <Image src={blog.image} layout="fill" alt="" className="opacity-50" />

                <div className="absolute bottom-8 left-4 w-11/12 lg:left-6">
                  <h2 className="bold  mb-2 text-2xl font-normal capitalize text-white">{blog.title}</h2>
                  <p className="bold  text-base font-normal normal-case text-white line-clamp-2">{blog.description}</p>
                  <div className="mt-8 flex flex-row justify-between">
                    <div>
                      <p className="text-gray-300">By Unihosts</p>
                    </div>

                    <div>
                      <p className="normal-case text-gray-300">{formatDate(blog.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}
