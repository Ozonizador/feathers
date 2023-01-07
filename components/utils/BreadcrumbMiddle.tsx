/* PAGINA 59 DO XD */
import Image from "next/image";

interface BreadcrumbMiddleProps {
  title: string;
  icon: string;
}

const BreadcrumbMiddle = ({ title, icon }: BreadcrumbMiddleProps) => {
  return (
    <>
      <div className="mx-auto mt-12 mb-6 flex w-5/6 flex-col items-center justify-center align-middle">
        <div className="flex w-full flex-row items-center justify-center gap-4 align-middle">
          <div className="w-full">
            <hr />
          </div>
          <div>
            <Image className="" src={icon} alt="breadcrumb-image" height={145} width={145} />
          </div>
          <div className="w-full">
            <hr />
          </div>
        </div>
        <div className="ml-4 text-xl font-bold text-primary-500">{title}</div>
      </div>
    </>
  );
};

export default BreadcrumbMiddle;
