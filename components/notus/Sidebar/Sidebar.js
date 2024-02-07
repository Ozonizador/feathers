import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Brand */}
          <Link
            href="/"
            className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
          >
            <div className="img_div relative h-20 w-52">
              <Image
                src="/images/logo1.png"
                alt=""
                style={{ objectFit: "contain" }}
                fill
                priority
                // sizes="(max-width: 768px) 300px, (max-width: 1200px) 864px, 864px"
              ></Image>
            </div>
          </Link>
          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "absolute left-0 right-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none "
            }
          >
            {/* Collapse header */}
            <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                  >
                    Notus NextJS
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mb-4 mt-6 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 h-12 w-full rounded  border border-0 border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full">
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/superadmin/dashboard" className={`block py-3 pl-2 text-xs font-bold`}>
                  <span className={`${router.asPath.includes("dashboard") ? "border-b-2 border-primary-500" : ""}`}>
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/superadmin/faqs" className={"block py-3 pl-2 text-xs font-bold"}>
                  <span className={`${router.asPath.includes("faqs") ? "border-b-2 border-primary-500" : ""}`}>
                    Faqs
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/superadmin/blogs" className={"block py-3 pl-2 text-xs font-bold"}>
                  <span
                    className={`${router.asPath.includes("blogs") ? "border-b-2 border-primary-500" : ""}`}
                  >
                    Blogs
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/superadmin/profiles" className={"block py-3 pl-2 text-xs font-bold"}>
                  <span className={`${router.asPath.includes("profiles") ? "border-b-2 border-primary-500" : ""}`}>
                    Perfis
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/superadmin/advertisements" className={"block py-3 pl-2 text-xs font-bold"}>
                  <span
                    className={`${router.asPath.includes("advertisements") ? "border-b-2 border-primary-500" : ""}`}
                  >
                    Advertisements
                  </span>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <Link
              href={"/"}
              className="text-blueGray-500 block pb-4 pt-1 text-xs font-bold uppercase no-underline md:min-w-full"
            >
              Ir para site
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
