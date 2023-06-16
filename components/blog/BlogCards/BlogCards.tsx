import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../../../models/blog";
import { pt } from "date-fns/locale";

interface BlogCardsProps {
  blogs: Blog[];
}

export default function BlogCards({ blogs }: BlogCardsProps) {
  return (
    <section className="mx-auto pb-5 pt-20">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        <div className="flex flex-col gap-8 lg:flex-row ">
          {blogs &&
            blogs.map((blog) => {
              return (
                <Link href={`/blog/${blog.slug}`} key={blog.id}>
                  <div className="w-full cursor-pointer lg:w-1/2">
                    <div className="flex-1 rounded-3xl bg-white p-5 drop-shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center  lg:justify-center lg:gap-8 lg:align-middle">
                        <div className="w-full rounded-3xl lg:w-80">
                          <Image
                            layout="responsive"
                            src={blog.image}
                            alt=""
                            objectFit="cover"
                            height="100%"
                            width="100%"
                            className="rounded-3xl"
                          ></Image>
                        </div>

                        <div className="ml-3 flex w-full flex-col">
                          <div className="mb-2 mt-3 text-xl lg:mt-0">{blog.title}</div>
                          <div className="mt-1 line-clamp-2 text-sm">{blog.description}</div>

                          <div className="mt-5 flex w-11/12 flex-row justify-between gap-0 lg:w-full">
                            <div className=" text-sm text-gray-400">
                              {format(parseISO(blog.created_at), "dd MMMM yyyy", {
                                locale: pt,
                              })}
                            </div>
                            <div className="text-sm text-gray-400 ">By Unihosts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
