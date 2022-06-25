import React from "react";

import Socials from "../socials/Socials";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="grid grid-cols-1 gap-1 bg-secondary-300 py-4 px-12 lg:grid-cols-5 lg:gap-5">
          <div className="my-auto mx-auto flex">
            <Image src="/images/logo2.svg" alt="unihosts" height="200" width="200"></Image>
          </div>
          <div className="ml-5 py-5 text-center text-neutral-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Unihosts</h3>
            <div className="py-1">
              <Link href="/10" className="fs-300 clr-white">
                Sobre nós
              </Link>
            </div>
            <div className="py-1">
              <Link href="/8/#" className="fs-300 clr-white">
                Blog
              </Link>
            </div>
            <div className="py-1">
              <Link href="/53" className="fs-300 clr-white">
                Torne-se um parceiro
              </Link>
            </div>
            <div className="py-1">
              <Link href="/53" className="fs-300 clr-white">
                Termos e condições
              </Link>
            </div>
            <div className="py-1">
              <Link href="/53" className="fs-300 clr-white">
                Política de cookies
              </Link>
            </div>
            <div className="py-1">
              <Link href="/53" className="fs-300 clr-white">
                Fale connosco
              </Link>
            </div>
          </div>
          <div className="py-5 text-center text-neutral-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Estudantes</h3>
            <div className="py-1">
              <Link href="/" className="fs-300 clr-white">
                Como alugar
              </Link>
            </div>

            <div className="py-1">
              <Link href="/9" className="fs-300 clr-white">
                Ajuda para os Estudantes
              </Link>
            </div>

            <div className="py-1">
              <Link href="/auth/registar" className="fs-300 clr-white">
                Iniciar sessão/Registar
              </Link>
            </div>
          </div>
          <div className="py-5 text-center text-neutral-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Senhorios</h3>

            <div className="py-1">
              <Link href="/7" className="fs-300 clr-white">
                Como funciona
              </Link>
            </div>
            <div className="py-1">
              <Link href="/34" className="fs-300 clr-white">
                Ajuda para os senhorios
              </Link>
            </div>

            <div className="py-1">
              <Link href="/12" className="fs-300 clr-white">
                Iniciar sessão/ Registar
              </Link>
            </div>
            <div className="py-1">
              <Link href="/4_5" className="fs-100 btn-contain footer-last transition">
                Anuncie a sua propriedade
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-center py-5">
            <Socials type="secondary" size="md" />
          </div>
        </div>
        <div className="bg-secondary-300 px-20">
          <p className="mb-1 border-t border-neutral-100 pt-8 pb-7 text-center text-neutral-100">
            Unihosts
          </p>
        </div>
      </div>
    </footer>
  );
}
