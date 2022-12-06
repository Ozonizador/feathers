import Link from "next/link";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Button from "../components/utils/Button";

const JoaoTest = () => {
  const [cookies, setCookie] = useCookies(["test"]);
  useEffect(() => {
    setCookie("test", true, { path: "/" });
  }, []);
  return (
    <div className="mt-5 flex flex-col justify-center px-20">
      <div>Modo de Teste Ativado</div>
      <Link href="/">
        <Button type={"button"}>Ir para homepage</Button>
      </Link>
    </div>
  );
};

export default JoaoTest;
