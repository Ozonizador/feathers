import { BlogCategoryLabel } from "../../../models/blog";

export default function BlogTitle() {
  return (
    <section className="container mx-auto pt-20 pb-5">
      <div className="flex flex-col items-center justify-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-bold lg:text-left lg:text-6xl">Pertence Onde Tu Quiseres!</div>
        <div className="flex h-5 w-full items-center lg:w-44 ">
          <select
            className="mt-24 w-full  rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:mt-0 lg:w-44"
            placeholder="Categoria"
          >
            {Object.keys(BlogCategoryLabel).map((option, index) => {
              return (
                <option value={option} key={index}>
                  {BlogCategoryLabel[option]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </section>
  );
}
