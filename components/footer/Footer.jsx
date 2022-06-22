import React from "react";

import Socials from '../socials/Socials'
import Image from 'next/image';
import Link  from "next/link";
// import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid bg-footer">
                <div className="ycontainer-sm footer">
                    <article className="footer-article logo">
                        <Image src="/images/logo2.svg" alt="" style={{ width: "17.25rem" }} height={32} width={32}></Image>
                    </article>
                    <article className="footer-article article1">
                        <h3 className="footer-heading fs-300 clr-white bold">
                            Unihosts
                        </h3>

                        <Link href="/10" className="fs-300 clr-white">
                            Sobre nós
                        </Link>

                        <Link href="/8/#" className="fs-300 clr-white">
                            Blog
                        </Link>

                        <Link href="/53" className="fs-300 clr-white">
                            Torne-se um parceiro
                        </Link>

                        <Link href="/53" className="fs-300 clr-white">
                            Termos e condições
                        </Link>

                        <Link href="/53" className="fs-300 clr-white">
                            Política de cookies
                        </Link>

                        <Link href="/53"className="fs-300 clr-white">
                            Fale connosco
                        </Link>
                    </article>
                    <article className="footer-article article2">
                        <h3 className="footer-heading fs-300 clr-white bold">
                            Estudantes
                        </h3>

                        <Link href="/" className="fs-300 clr-white">
                            Como alugar
                        </Link>

                        <Link href="/9" className="fs-300 clr-white">
                            Ajuda para os Estudantes
                        </Link>

                        <Link href="/12" className="fs-300 clr-white">
                            Iniciar sessão/Registar
                        </Link>
                    </article>
                    <article className="footer-article article3">
                        <h3 className="footer-heading fs-300 clr-white bold">
                            Senhorios
                        </h3>

                        <Link href="/7" className="fs-300 clr-white">
                            Como funciona
                        </Link>

                        <Link href="/34" className="fs-300 clr-white">
                            Ajuda para os senhorios
                        </Link>

                        <Link href="/12" className="fs-300 clr-white">
                            Iniciar sessão/ Registar
                        </Link>

                        <div>
                            <Link href="/4_5" className="fs-100 btn-contain footer-last transition btn-shadow">
                                Anuncie a sua propriedade
                            </Link>
                        </div>
                    </article>
                    <article className="socials">
                        <Socials
                            bgClr="#fff"
                            clr="#c48b60"
                            width="38px"
                            fSize="24px"
                        />
                    </article>
                </div>
                <div className="container-sm footer-bottom">
                    <p
                        className="fs-100 clr-white"
                        style={{
                            paddingTop: "2rem",
                            paddingBottom: "1.625rem",
                            marginBottom: "0",
                            textAlign: "center",
                        }}
                    >
                        Unihosts
                    </p>
                </div>
            </div>
        </footer>
    );
}
