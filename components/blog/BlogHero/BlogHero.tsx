import { Blog } from "../../../models/blog";
import Image from "next/image";
import { pt, enGB } from "date-fns/locale";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
interface BlogHeroProps {
  blogs: Blog[];
}

export default function BlogHero({ blogs }: BlogHeroProps) {
  const router = useRouter();
  return (
    <section className="mx-10 pt-20">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        {!blogs || (blogs.length === 0 && <div>Sem blog posts</div>)}
        {blogs &&
          blogs.map((blog) => {
            return (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="w-full">
                <article className="relative h-[500px] w-full cursor-pointer rounded-3xl bg-black px-7">
                  <Image
                    src={blog.image}
                    fill
                    alt=""
                    style={{ objectFit: "cover" }}
                    className="rounded-3xl opacity-50"
                  />

                  <div className="absolute bottom-8 left-4 w-11/12">
                    <h3 className="bold mb-4 text-md text-bold font-normal capitalize text-white">{blog.title}</h3>
                    <p className="bold line-clamp-2 text-xs font-normal normal-case text-white">{blog.description}</p>
                    <div className="mt-7 flex flex-row justify-between">
                      <div>
                        <p className="normal-case text-gray-300">
                          {format(parseISO(blog.created_at), "dd MMMM yyyy", {
                            locale: router.locale === "pt" ? pt : enGB,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-300">By Unihosts</p>
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
