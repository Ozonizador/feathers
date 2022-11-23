import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { GENERAL_ADMIN_URL, PAYMENTS_URL, CONFIGURATIONS_URL } from "../../models/paths";
import Image from "next/image";
/* Images */
import personalInformationImage from "../../public/images/mainmenu_1.png";
import paymentsImage from "../../public/images/mainmenu_2.png";
import configurationsImage from "../../public/images/mainmenu_3.png";

const Index = () => {
  return (
    <>
      <div className="mb-3 flex flex-1 justify-center">
        <h5 className="my-12 text-5xl font-bold">Conta</h5>
      </div>

      <div className="flex flex-col items-center justify-center gap-12 px-4 pb-10 align-middle">
        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href={GENERAL_ADMIN_URL}>
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className="flex p-3">
                  <div>
                    <Image src={personalInformationImage} alt="Informações pessoais" height={96} width={96} />
                  </div>
                  <div className="ml-3 lg:ml-5">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Informações pessoais</div>
                    <div>Forneça os dados sobre si e como o podemos contactar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href={PAYMENTS_URL}>
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className="flex p-3">
                  <div>
                    <Image src={paymentsImage} alt="Pagamentos" height={96} width={96} />
                  </div>
                  <div className="ml-3 lg:ml-5">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Pagamentos e recebimentos</div>
                    <div>Defina como vai receber/pagar as transações que efectuar.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div className="rounded-2xl bg-white drop-shadow-xl lg:w-1/3">
          <Link href={CONFIGURATIONS_URL}>
            <a>
              <div className="my-5 flex cursor-pointer pl-5 ">
                <div className="flex p-3">
                  <div>
                    <Image src={configurationsImage} alt="Configurações" height={96} width={96} />
                  </div>
                  <div className="ml-3 lg:ml-5">
                    <div className="mb-2 text-xl font-bold lg:text-2xl">Configurações</div>
                    <div>Atualize a sua palavra-passe e controle as notificações.</div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
