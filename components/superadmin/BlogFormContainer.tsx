import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Blog } from "../../models/blog";
import Input from "../utils/Input";

export type BlogAdminForm = Pick<Blog, "title" | "description" | "category">;

type FormProps = {
  onSubmit: (data: any) => void;
  children: ReactNode;
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false });

const BlogFormContainer = ({ onSubmit, children }: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useFormContext();
  return (
    <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name={"title"}
          render={({ field: { onChange, value } }) => {
            return <Input onChange={onChange} name="title" labelText="Titulo" minLength="10" value={value} />;
          }}
        ></Controller>
      </div>
      <div>
        <Controller
          control={control}
          name={"description"}
          render={({ field: { onChange, value } }) => {
            return (
              <div data-color-mode="light">
                <MDEditor value={value} onChange={onChange} />
              </div>
            );
          }}
        ></Controller>
      </div>
      <div>
        <Controller
          control={control}
          name={"category"}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <label>Categoria</label>
                <select
                  className="w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2"
                  value={value}
                  onChange={onChange}
                >
                  <option value="LANDLORD">Senhorio</option>
                  <option value="TENANT">Estudante</option>
                </select>
              </>
            );
          }}
        ></Controller>
      </div>
      <button className={classNames("flex cursor-pointer justify-center", { "bg-opacity-20": !isDirty })} type="submit">
        {children}
      </button>
    </form>
  );
};

export default BlogFormContainer;
