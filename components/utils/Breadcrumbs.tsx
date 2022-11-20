import Image from "next/image";
import Link from "next/link";

interface BreadcrumbsProps {
  icon?: string;
  paths: BreadcrumbPath[];
}

export type BreadcrumbPath = {
  url: string;
  label: string;
};

const Breadcrumbs = ({ icon, paths }: BreadcrumbsProps) => {
  const numberUrls = paths.length;
  return (
    <div className="container mx-auto my-20 mt-24 flex w-11/12 items-center pl-0 align-middle lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div>{icon && <Image src={icon} alt="Favoritos" height={55} width={55} />}</div>
      <div className="ml-4 flex gap-2 text-xl">
        {paths &&
          paths.map((path, index) => {
            const mainInfo = path.url ? (
              <Link className="inline cursor-pointer" href={path.url}>
                {path.label}
              </Link>
            ) : (
              <div className="inline">{path.label}</div>
            );
            return (
              <div key={index} className="flex gap-2">
                {mainInfo}
                {index !== numberUrls - 1 && ">"}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
