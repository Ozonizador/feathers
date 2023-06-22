import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { TfiPlus } from "react-icons/tfi";
import { supabaseAdmin } from "../../../lib/supabaseAdminClient";
import { Faq } from "../../../models/faq";
import { ProfilesResponse, PROFILE_TABLE_NAME, PROFILE_COLUMNS } from "../../../models/profile";
import { trpc } from "../../../utils/trpc";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/utils/Input";

const FaqSuperAdminPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<"TENANT" | "LANDLORD">("LANDLORD");
  const { data, refetch } = trpc.faqs.getFaqs.useQuery();
  const addFaq = trpc.faqs.addFaq.useMutation();

  const tenantFaqs = data && data.data && data.data.filter((faq) => faq.type === "TENANT");
  const landlordFaqs = data && data.data && data.data.filter((faq) => faq.type === "LANDLORD");

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Pick<Faq, "answer" | "question" | "type">>({
    defaultValues: { answer: "", question: "", type: "LANDLORD" },
  });

  const addFormSubmit = async (data: Pick<Faq, "answer" | "question" | "type">) => {
    await addFaq.mutateAsync({ ...data });
    refetch();
    reset();
  };
  return (
    <div className="max-width flex flex-col pt-5">
      <div className="mb-3 flex items-center gap-2">
        <div
          onClick={() => setSelectedFaq("TENANT")}
          className={classNames({ "text-primary-500": selectedFaq === "TENANT" })}
        >
          Estudante
        </div>
        <div
          onClick={() => setSelectedFaq("LANDLORD")}
          className={classNames({ "text-primary-500": selectedFaq === "LANDLORD" })}
        >
          Senhorio
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {selectedFaq === "LANDLORD" &&
          (landlordFaqs ? (
            landlordFaqs.map((faq) => <SuperAdminFaqItem key={faq.id} {...faq} />)
          ) : (
            <p>Não tem faqs.</p>
          ))}
        {selectedFaq === "TENANT" &&
          (tenantFaqs ? tenantFaqs.map((faq) => <SuperAdminFaqItem key={faq.id} {...faq} />) : <p>Não tem faqs.</p>)}
      </div>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit(addFormSubmit)}>
        <div className="text-2xl">Adicionar:</div>

        <div>
          <Controller
            control={control}
            name={"question"}
            render={({ field: { onChange, value } }) => {
              return <Input onChange={onChange} name="question" labelText="Pergunta" minlength="10" value={value} />;
            }}
          ></Controller>
        </div>
        <div>
          <Controller
            control={control}
            name={"answer"}
            render={({ field: { onChange, value } }) => {
              return <Input onChange={onChange} name="answer" labelText="Resposta" minlength="10" value={value} />;
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
        <button className="flex cursor-pointer justify-center" type="submit">
          <div className="rounded-full border border-primary-500 p-2">
            <TfiPlus size={32} className="text-primary-500" />
          </div>
        </button>
      </form>
    </div>
  );
};

type SuperAdminFaqItemProps = Pick<Faq, "answer" | "question">;

const SuperAdminFaqItem = ({ answer, question }: SuperAdminFaqItemProps) => {
  return (
    <div className="flex flex-col gap-1 border-b border-t border-neutral-100 py-5">
      <h6 className="text-xl font-black">{question}</h6>
      <p>{answer}</p>
    </div>
  );
};

export default FaqSuperAdminPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const user = session.user;
  const { data, error } = await supabaseAdmin
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("id, user_type")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  if (error || !data || data.user_type !== "ADMIN")
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
