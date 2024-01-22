import { PropsWithChildren, ReactNode } from "react";

export type UnideskStructureProps = PropsWithChildren<{
  children: ReactNode;
}>;

const Structure = ({ children }: UnideskStructureProps) => {
  return (
    <div className="px-5 lg:px-32">
      <div className="mb-20 mt-10 w-full rounded-2xl border border-terciary-700 bg-terciary-300 pl-0 ">
        <div className="flex flex-col lg:flex-row">{children}</div>
      </div>
    </div>
  );
};

const Menu = ({ children }: UnideskStructureProps) => (
  <div className="w-full p-5 text-sm lg:w-[27%] lg:border-r lg:px-6 lg:py-12">{children}</div>
);

const Content = ({ children }: UnideskStructureProps) => {
  return <div className="flex w-full flex-col gap-3 px-3 pt-12 text-sm lg:mx-auto lg:ml-8 lg:w-2/3">{children}</div>;
};

export const UnideskStructure = Object.assign(Structure, {
  Menu: Menu,
  Content: Content,
});
