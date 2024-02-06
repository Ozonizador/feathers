import Payments from "../../components/admin/Payments";
import { SupabaseClient, User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FeathersInput from "../../components/utils/Input";
import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import { ADMIN_URL } from "../../models/paths";
import useProfileService from "../../hooks/useProfileService";
import { PAYMENT_METHODS_TABLE_NAME, PaymentMethod } from "../../models/profile";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

const paths = [
  { url: ADMIN_URL, label: "Conta" },
  { url: "", label: "Pagamentos e Recebimentos" },
] as BreadcrumbPath[];

type BankTransfer = {
  iban: string;
  swift: string;
};

const Index = (props: any) => {
  const user = props.user;
  const payment_method = props.payment_method;
  const [state, setState] = useState<string>("Recebimentos");
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<BankTransfer>({
    defaultValues: {
      swift: payment_method.swift ?? "",
      iban: payment_method.iban ?? ""
    }
  });
  const { addPaymentMethods } = useProfileService();

  const onSubmit = async ({ iban, swift }: BankTransfer) => {
    const { data, error } = await addPaymentMethods(user.id, iban, swift);

    if (error) {
      return toast.error(t("messages:errors.editing_info"));
    }
  };
  return (
    <div className="max-width mb-20">
      <Breadcrumbs paths={paths} />

      <div className="flex flex-1 justify-center">
        <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-5 lg:px-32">
          <div className="mb-5 text-3xl font-bold">Pagamentos e Recebimentos</div>
          <p>Adicione e faça gestão dos seus métodos de pagamento e recebimento.</p>

          {/* BOTÕES*/}
          <div className=" mb-20 mt-10 flex flex-col gap-4 lg:my-20 lg:flex-row">
            <button
              className={`rounded-xl px-12 py-4 text-xl ${
                state == "Pagamentos" ? "bg-primary-500 text-white" : "bg-terciary-500 text-secondary-400"
              }`}
              onClick={() => setState("Pagamentos")}
            >
              Pagamentos
            </button>
            <button
              className={`rounded-xl px-12 py-4 text-xl ${
                state == "Recebimentos" ? "bg-primary-500 text-white" : "bg-terciary-500 text-secondary-400"
              }`}
              onClick={() => setState("Recebimentos")}
            >
              Recebimentos
            </button>
          </div>

          {state == "Recebimentos" && (
            <div>
              <h4 className="text-xl">Transferencia Bancaria</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 mt-2">
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FeathersInput value={value} onChange={onChange} name="nome" labelText={"Iban:"} />
                    )}
                    name="iban"
                  ></Controller>
                </div>
                <div className="mb-4 mt-2">
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FeathersInput value={value} onChange={onChange} name="nome" labelText={"Swift:"} />
                    )}
                    name="swift"
                  ></Controller>
                </div>
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={classNames(
                    "mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 px-9 py-4 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44",
                    { "opacity-50": !isDirty }
                  )}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {t("save")}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const {data, error} = await supabase
    .from<"payment_methods", PaymentMethod>(PAYMENT_METHODS_TABLE_NAME)
    .select()
    .eq("profile_id", session.user.id)
    .single();
  return {
    props: {
      initialSession: session,
      user: session.user,
      payment_method: data,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
