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
    <div className="mx-auto my-20 mt-24 flex items-center px-5 align-middle lg:my-20 lg:w-full lg:px-3">
      <div>{icon && <Image src={icon} alt="Favoritos" height={55} width={55} />}</div>
      <div className="ml-3 flex gap-2 lg:ml-4 lg:text-xl">
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
