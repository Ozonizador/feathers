import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../../../models/blog";
import { pt, enGB } from "date-fns/locale";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { isString } from "lodash";

interface BlogCardsProps {
  blogs: Blog[];
}

export default function BlogCards({ blogs }: BlogCardsProps) {
  const router = useRouter();
  const renderers = {
    p: (props: any) => (
      <p className={"leading-8 "}>{props.children}</p>
    ),
  };
  return (
    <section className="mx-auto pt-10 xl:pt-20">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        <div className="flex flex-col gap-8 lg:flex-row ">
          {blogs &&
            blogs.map((blog) => {
              return (
                <Link href={`/blog/${blog.slug}`} key={blog.id}>
                  <div className="w-full cursor-pointer mx-auto lg:w-1/2">
                    <div className="flex-1 rounded-3xl bg-white p-5 drop-shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8 lg:align-middle">
                        <div className="relative h-40 w-full rounded-3xl lg:w-80">
                          <Image
                            src={blog.image}
                            fill
                            alt=""
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                            className="rounded-3xl"
                          ></Image>
                        </div>

                        <div className="ml-3 flex w-full flex-col">
                          <div className="mb-2 mt-3 text-md font-extrabold lg:mt-0">{blog.title}</div>
                          <div className="mt-1 line-clamp-2 text-xs">
                            {" "}
                            <ReactMarkdown components={renderers}>{blog.description.slice(0, 200)}</ReactMarkdown>
                          </div>

                          <div className="mt-5 flex w-11/12 flex-row justify-between gap-0 lg:w-full">
                            <div className=" text-sm text-gray-400">
                              {format(parseISO(blog.created_at), "dd MMMM yyyy", {
                                locale: router.locale === "pt" ? pt : enGB,
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
