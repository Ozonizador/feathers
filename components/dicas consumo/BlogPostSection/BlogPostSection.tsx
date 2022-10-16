import React from "react";
import Link from "next/link";
import { RiFacebookCircleLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { GrTwitter } from "react-icons/gr";
import { Blog, BlogCategoryLabel } from "../../../models/blog";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface BlogPostSectionProps {
  blog: Blog;
}

const BlogPostSection = ({ blog }: BlogPostSectionProps) => {
  const renderers = {
    p: (props) => <p className="my-2">{props.children}</p>,
  };

  return (
    <section>
      <div className="relative h-[650px] bg-black">
        <Image layout="fill" src={blog.image} alt="blog" className="opacity-50" objectFit="cover" />

        <div className="absolute top-1/4 z-50 flex flex-col items-center justify-start py-4 align-middle lg:w-full lg:justify-center">
          <div className="mt-5 mb-7 rounded-full bg-primary-300 px-7 py-3 text-xl text-white lg:mt-0">
            {BlogCategoryLabel[blog.category]}
          </div>
          <h1 className="w-full text-center text-2xl font-bold text-white lg:w-3/4 lg:text-5xl">{blog.title}</h1>
          <p className="text-x1 mt-6  text-center text-white lg:mt-14 lg:text-2xl">BY UNIHOST ON FEBRUARY 02, 2022</p>
        </div>
      </div>

      <div className="container mx-auto mt-20 px-8 lg:px-32">
        <ReactMarkdown components={renderers}>{blog.description}</ReactMarkdown>

        <div className="mt-20 mb-24 flex items-center gap-4 align-middle">
          <div className="text-2xl font-bold ">Partilhar</div>
          <Link href="/">
            <a>
              <RiFacebookCircleLine className=" text-3xl text-primary-500" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <IoLogoInstagram className=" text-3xl text-primary-500" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <GrTwitter className=" text-3xl text-primary-500" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection;
