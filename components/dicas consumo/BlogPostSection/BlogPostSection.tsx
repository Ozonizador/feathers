import React from "react";
import Link from "next/link";
import { RiFacebookCircleLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { GrTwitter } from "react-icons/gr";
import { Blog } from "../../../models/blog";
import ReactMarkdown from "react-markdown";

interface BlogPostSectionProps {
  blog: Blog;
}

const BlogPostSection = ({ blog }: BlogPostSectionProps) => {
  return (
    <section>
      <div className="background-banner">
        <div className="flex flex-col items-center justify-start  py-4 align-middle lg:justify-center lg:py-96">
          <div className="mt-5 mb-7 rounded-full bg-primary-300 px-7 py-3 text-xl text-white lg:mt-0">SENHORIO</div>
          <h1 className="w-3/4 text-center text-2xl font-bold text-white lg:text-6xl">{blog.title}</h1>
          <p className="text-x1 mt-6  text-center text-white lg:mt-14 lg:text-2xl">BY UNIHOST ON FEBRUARY 02, 2022</p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-32">
        <ReactMarkdown>{blog.description}</ReactMarkdown>

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
