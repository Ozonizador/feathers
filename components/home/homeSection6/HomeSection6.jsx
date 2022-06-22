import React from "react";
import HomeSection6Cards from "../homeSection6Cards/HomeSection6Cards";

export default function HomeSection6() {
    return (
        <section>
            <div className="container-fluid bg-light">
                <div
                    className="ycontainer-sm section6"
                    style={{ textAlign: "center" }}
                >
                    <h2 className="fs-900 clr-black-main bold">Testemunhos</h2>
                    <div className="sec6-card-container">
                        <HomeSection6Cards
                            testimonial="Com a UniHosts foi tudo mais fácil! Sempre tive alguma dificuldade para encontrar inquilinos para o respetivo Ano Lectivo, contudo com este serviço digital especializado consigo de forma eficiente e eficaz encher a minha casa!"
                            img="/images/sec6-person1.jpg"
                            name="John Doe"
                            desc="Proprietário UniHosts"
                        />
                        <HomeSection6Cards
                            testimonial="Enquanto Senhorio foi muito prático para comunicar o meu alojamento! Intuitivo e a funcionalidade de saber quem vai ficar na minha casa ajuda muito! A política de proteção de proprietários é algo que me faz querer repetir a experiência sem medo."
                            img="/images/sec6-person2.jpg"
                            name="John Doe"
                            desc="Proprietário UniHosts"
                        />
                        <HomeSection6Cards
                            testimonial="Tinha o objetivo de apenas alugar os quartos que tinha disponíveis e foi muito simples. Consegui alugar mesmo a meio do ano letivo e correu tudo muito bem! Recomendo a novos proprietários que procuram encontrar estudantes por uma fee bem razoável!"
                            img="/images/sec6-person3.jpg"
                            name="John Doe"
                            desc="Proprietário UniHosts"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
