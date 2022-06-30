// 404.js
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="p-28">
      <h1>Pagina não encontrada</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
}
