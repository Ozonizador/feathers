import classNames from "classnames";
import { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Faq } from "../../models/faq";
import Input from "../utils/Input";

export type FaqAdminForm = Pick<Faq, "answer" | "question" | "type">;

type FormProps = {
  onSubmit: (data: any) => void;
  children: ReactNode;
};

const FaqFormContainer = ({ onSubmit, children }: FormProps) => {
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
          name={"question"}
          render={({ field: { onChange, value } }) => {
            return <Input onChange={onChange} name="question" labelText="Pergunta" minLength="10" value={value} />;
          }}
        ></Controller>
      </div>
      <div>
        <Controller
          control={control}
          name={"answer"}
          render={({ field: { onChange, value } }) => {
            return <Input onChange={onChange} name="answer" labelText="Resposta" minLength="10" value={value} />;
          }}
        ></Controller>
      </div>
      <div>
        <Controller
          control={control}
          name={"type"}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <label>Tipo</label>
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

export default FaqFormContainer;
