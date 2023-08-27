// 404.js
import Link from "next/link";
import { HOME_URL } from "../models/paths";

export default function FourOhFour() {
  return (
    <div className="p-28">
      <h1>Pagina não encontrada</h1>
      <Link href={HOME_URL}>Go back home</Link>
    </div>
  );
}
