// 404.js
import Link from "next/link";
import { HOME_URL } from "../models/paths";

export default function FourOhFour() {
  return (
    <div className="p-28">
      <h1>Pagina não encontrada</h1>
      <Link href={HOME_URL}>
        <a>Go back home</a>
      </Link>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  return {
    redirect: {
      destination: "/",
    },
  };
}
