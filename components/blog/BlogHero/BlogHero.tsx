import { Blog } from "../../../models/blog";
import Image from "next/image";
import { dateToFormat } from "../../../utils/utils";
import Link from "next/link";
interface BlogHeroProps {
  blogs: Blog[];
}

export default function BlogHero({ blogs }: BlogHeroProps) {
  return (
    <section className="container mx-auto py-20">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        {!blogs || (blogs.length === 0 && <div>Sem blog posts</div>)}
        {blogs &&
          blogs.map((blog) => {
            return (
              <Link href={`/blog/${blog.slug}`} key={blog.id}>
                <article className=" relative h-96 w-full cursor-pointer rounded-3xl bg-black px-7 lg:w-2/6">
                  <Image src={blog.image} layout="fill" alt="" className="rounded-3xl opacity-50" />

                  <div className="absolute bottom-8 left-4 w-11/12">
                    <h2 className="bold  mb-2 text-2xl font-normal capitalize text-white">{blog.title}</h2>
                    <p className="bold  text-base font-normal normal-case text-white line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="mt-8 flex flex-row justify-between">
                      <div>
                        <p className="text-gray-300">By Unihosts</p>
                      </div>

                      <div>
                        <p className="normal-case text-gray-300">{dateToFormat(new Date(blog.created_at))}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
