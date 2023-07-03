import { PropsWithChildren, ReactNode } from "react";

export type UnideskStructureProps = PropsWithChildren<{
  children: ReactNode;
}>;

const Structure = ({ children }: UnideskStructureProps) => {
  return (
    <div className="max-width px-5">
      <div className="max-width my-20 rounded-2xl border border-terciary-700 bg-terciary-300 pl-0 lg:container lg:my-20 lg:w-full lg:px-0">
        <div className="flex flex-col lg:flex-row">{children}</div>
      </div>
    </div>
  );
};

const Menu = ({ children }: UnideskStructureProps) => (
  <div className="mx-auto w-2/3 p-5 lg:ml-auto lg:w-1/3 lg:border-r lg:px-6 lg:py-12">{children}</div>
);

const Content = ({ children }: UnideskStructureProps) => {
  return <div className="flex flex-col gap-3 px-3 pt-12 lg:mx-auto lg:ml-12 lg:w-4/5">{children}</div>;
};

export const UnideskStructure = Object.assign(Structure, {
  Menu: Menu,
  Content: Content,
});
