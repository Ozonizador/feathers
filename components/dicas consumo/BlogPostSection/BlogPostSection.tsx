import React from "react";
import { RiFacebookCircleLine } from "react-icons/ri";
import { GrTwitter } from "react-icons/gr";
import { Blog, BlogCategoryLabel } from "../../../models/blog";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { pt, enGB } from "date-fns/locale";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { isString } from "lodash";
import { Helmet } from "react-helmet";
interface BlogPostSectionProps {
  blog: Blog;
}

const BlogPostSection = ({ blog }: BlogPostSectionProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const renderers = {
    p: (props: any) => (
      <p className={"leading-8 " + (isString(props.children[0]) ? "mb-2" : "mb-2 mt-8")}>{props.children}</p>
    ),
    h1: (props: any) => <h1 className="text-primary-500">{props.children}</h1>,
    strong: (props: any) => <strong className="my-5 text-xl font-extrabold">{props.children}</strong>,
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${window.location.origin}${router.asPath}&via=getboldify`;

    window.open(url, "_blank")?.focus();
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${router.asPath}`;

    window.open(url, "_blank")?.focus();
  };
  return (
    <Helmet>
      {/* Open Graph meta tags */}
      <meta property="og:title" key="og:title" content={blog.title} />
      <meta property="og:description" key="og:description" content={blog.description} />
      <meta property="og:image" key="og:image" content={blog.image} />
      <meta property="og:type" content="website" />

      <section>
        <div className="relative h-[650px] bg-black">
          <Image fill src={blog.image} alt="blog" className="opacity-50" style={{ objectFit: "cover" }} />

          <div className="absolute top-1/4 z-50 flex flex-col items-center justify-start py-4 align-middle lg:w-full lg:justify-center">
            <div className="mb-7 mt-5 rounded-full bg-primary-300 px-7 py-3 text-xl text-white lg:mt-0">
              {t(BlogCategoryLabel[blog.category])}
            </div>
            <h1 className="w-full text-center text-2xl font-bold text-white lg:w-3/4 lg:text-5xl">{blog.title}</h1>
            <p className="text-x1 mt-6  text-center text-white lg:mt-14 lg:text-2xl">
              {" "}
              <span className="capitalize">
                {format(parseISO(blog.created_at), "dd MMMM yyyy", {
                  locale: router.locale === "pt" ? pt : enGB,
                })}
              </span>
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-20 px-8 lg:px-32">
          <ReactMarkdown components={renderers}>{blog.description}</ReactMarkdown>

          <div className="mb-24 mt-20 flex items-center gap-4 align-middle">
            <div className="text-2xl font-bold ">{t("blog:share")}</div>
            <div onClick={shareOnFacebook}>
              <RiFacebookCircleLine className=" text-3xl text-primary-500" />
            </div>
            {/* <Link href="/">
            <a>
              <IoLogoInstagram className=" text-3xl text-primary-500" />
            </a>
          </Link> */}
            <div onClick={shareOnTwitter}>
              <GrTwitter className=" text-3xl text-primary-500" />
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default BlogPostSection;
