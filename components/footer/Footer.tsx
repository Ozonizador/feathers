import React from "react";
import Socials from "../socials/Socials";
import Image from "next/image";
import Link from "next/link";
import {
  ABOUT_US_URL,
  ANUNCIAR_PROP_URL,
  BLOG_URL,
  COMO_FUNCIONA_URL,
  CONTACTOS_URL,
  FAQS_URL,
  HOME_URL,
  LOGIN_URL,
} from "../../models/paths";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="grid grid-cols-1 gap-1 bg-secondary-300 px-12 py-4 lg:grid-cols-5 lg:gap-5 lg:pt-20">
          <div className="relative my-auto flex lg:mx-auto lg:-mt-16">
            <Image src="/images/logo2.svg" alt="unihosts" height="200" width="200"></Image>
          </div>
          <div className="ml-0 py-5 text-left text-terciary-100 lg:ml-5 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Unihosts</h3>
            <div className="py-1">
              <Link href={ABOUT_US_URL} className="fs-300 clr-white">
                Sobre nós
              </Link>
            </div>
            <div className="py-1">
              <Link href={BLOG_URL} className="fs-300 clr-white">
                Blog
              </Link>
            </div>
            <div className="py-1">
              <Link href={CONTACTOS_URL} className="fs-300 clr-white">
                Torne-se um parceiro
              </Link>
            </div>
            <div className="py-1">
              <Link href={HOME_URL} className="fs-300 clr-white">
                Termos e condições
              </Link>
            </div>
            <div className="py-1">
              <Link href={HOME_URL} className="fs-300 clr-white">
                Política de cookies
              </Link>
            </div>
            <div className="py-1">
              <Link href={CONTACTOS_URL} className="fs-300 clr-white">
                Fale connosco
              </Link>
            </div>
          </div>
          <div className="py-5 text-left text-terciary-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Estudantes</h3>
            <div className="py-1">
              <Link href={HOME_URL} className="fs-300 clr-white">
                Como alugar
              </Link>
            </div>

            <div className="py-1">
              <Link href={FAQS_URL} className="fs-300 clr-white">
                Ajuda para os Estudantes
              </Link>
            </div>

            <div className="py-1">
              <Link href={LOGIN_URL} className="fs-300 clr-white">
                Iniciar sessão/Registar
              </Link>
            </div>
          </div>
          <div className="py-5 text-left text-terciary-100 lg:text-left">
            <h3 className="mb-3 text-lg font-bold">Senhorios</h3>

            <div className="py-1">
              <Link href={COMO_FUNCIONA_URL}>Como funciona</Link>
            </div>
            <div className="py-1">
              <Link href={FAQS_URL} className="fs-300 clr-white">
                Ajuda para os senhorios
              </Link>
            </div>

            <div className="py-1">
              <Link href={LOGIN_URL} className="fs-300 clr-white">
                Iniciar sessão/ Registar
              </Link>
            </div>
            <Link href={ANUNCIAR_PROP_URL} className="transition">
              <div className="my-3 mt-7 flex w-fit rounded-full bg-primary-500 p-3 text-center">
                Anuncie a sua propriedade
              </div>
            </Link>
          </div>
          <div className="flex flex-1 justify-start py-5 lg:justify-center">
            <Socials type="secondary" size="md" />
          </div>
        </div>
        <div className="bg-secondary-300 px-20">
          <p className="border-t border-terciary-100 pb-7 pt-8 text-center text-terciary-100">Unihosts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
