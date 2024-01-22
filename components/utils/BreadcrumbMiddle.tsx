/* PAGINA 59 DO XD */
import Image from "next/image";

interface BreadcrumbMiddleProps {
  title: string;
  icon: string;
}

const BreadcrumbMiddle = ({ title, icon }: BreadcrumbMiddleProps) => {
  return (
    <>
      <div className="mx-auto my-6 flex w-4/5 flex-col items-center justify-center align-middle">
        <div className="flex w-full flex-row items-center justify-center gap-4 align-middle">
          <div className="w-full">
            <hr />
          </div>
          <div>
            <Image className="" src={icon} alt="breadcrumb-image" height={135} width={135} />
          </div>
          <div className="w-full">
            <hr />
          </div>
        </div>
        <div className="text-md mt-3 font-bold text-primary-500">{title}</div>
      </div>
    </>
  );
};

export default BreadcrumbMiddle;
