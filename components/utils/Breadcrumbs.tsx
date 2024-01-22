import { useTranslation } from "next-i18next";
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
  const { t } = useTranslation();
  const numberUrls = paths.length;
  return (
    <div className="mx-auto my-16 flex items-center px-5 align-middle lg:w-full lg:px-32">
      <div>{icon && <Image src={icon} alt="Favoritos" height={50} width={50} />}</div>
      <div className="lg:text-md ml-3 flex gap-2 lg:ml-4">
        {paths &&
          paths.map((path, index) => {
            const mainInfo = path.url ? (
              <Link className="inline cursor-pointer" href={path.url}>
                {t(path.label)}
              </Link>
            ) : (
              <div className="inline">{t(path.label)}</div>
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
