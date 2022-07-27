import React from "react";
import Link from "next/link";
import { RiFacebookCircleLine } from "react-icons/ri"
import { IoLogoInstagram } from "react-icons/io"
import { GrTwitter } from "react-icons/gr"

const DicasConsumoHero = () => {
    return (

        <section>
            <div className="background-banner">

                <div className="flex flex-col justify-start py-4  align-middle items-center lg:py-96 lg:justify-center">
                    <div className="text-white mt-5 rounded-full bg-primary-300 px-7 py-3 mb-7 text-xl lg:mt-0">SENHORIO</div>
                    <h1 className="text-2xl lg:text-6xl text-white w-3/4 text-center font-bold">5 FORMAS DE MELHORAR O CONSUMO ENERGÉTICO DA SUA CASA</h1>
                    <p className="text-x1 mt-6  text-white text-center lg:mt-14 lg:text-2xl">BY UNIHOST ON FEBRUARY 02, 2022</p>
                </div>
            </div>

            <div className="container mx-auto px-8 lg:px-32">
                <p className="text-2xl my-24">
                    É certo que Portugal tem melhorado muito no que diz respeito ao consumo energético das suas casas, devido à implementação de várias políticas que visam a eficiência nesse campo. No entanto, ainda muito há para fazer. Segundo os últimos relatórios oficiais, Portugal passou da posição 27 para o 7º lugar no ranking do Wnergy Efficiency Watch Survey. Contudo, a maioria dos portugueses continua sem conseguir aquecer as suas casas, devido à conjugação explosiva de dois factores predominantes: o alto preço da energia e a construção deficiente dos imóveis.<br /><br /> A factura da electricidade ao fim do mês é mesmo um dos principias encargos de qualquer família no final do mês. E pior do que uma factura de electricidade só mesmo duas facturas de electricidade, que é o que acontece aos proprietários, que têm uma casa arrendada com as contas incluídas ou no mercado turístico. Como é impossível pedir aos proprietários para consumir menos energia, a solução passa então por reduzir esses encargos. Mas como?<br /><br /> A solução não é fácil e é apenas relativa. No entanto, existem alguns conselhos que pode implementar na sua propriedade, de forma a aumentar a eficiência e a reduzir o desperdício energético. Assim, vá buscar o seu Certificado de Eficiência Energética, que representa o desempenho energético do seu imóvel, e siga estas 5 dicas de forma a alterar a sua classificação até à letra A, que significa que atingiu o topo no que diz respeito à poupança energética.
                </p>

                <div className="font-bold text-xl lg:text-3xl">1. OPTE POR UMA FONTE DE ENERGIA MAIS VERDE</div>
                <p className="text-2xl mt-7 mb-24">
                    Vivemos em plena crise ambiental e já não é possível ignorar que é preciso mudarmos os nossos hábitos de consumo. Se não adoptarmos comportamentos mais verdes e sustentáveis, o futuro como o conhecemos será obrigatoriamente diferente. E essa mudança começa connosco mesmos, nos nossos pequenos gestos e an própria casa. Assim, a alteração da fonte energética do seu imóvel para uma solução mais amiga do ambiente não só é mais sustentável, como é também mais eficiente e, consequentemente, mais económica. Compare assim preços de opções como o gás natural, por exemplo, e procure fazer simulações a médio e longo prazo, porque às vezes a poupança não se reflecte no imediato.
                </p>

                <div className="font-bold text-xl lg:text-3xl">2. TENHA EM CONSIDERAÇÃO A EXPOSIÇÃO SOLAR</div>
                <p className="text-2xl mt-7 mb-24">
                    Se está a pensar em investir numa propriedade, então é altura de começar a ter também em conta a eficiência energética, já que isso poderá vir a ser fundamental do ponto de vista financeiro. E uma das formas é ter em consideração a sua exposição solar. É que uma casa com luz natural elevada e predominante não só reduz os custos da electricidade, com não exige tanto de equipamentos de aquecimento. Não é por acaso que essa é uma característica que influencia determinantemente o preço dos imóveis. Por isso, se for adquirir casa, opte sempre por opções com boa exposição solar e orientadas a sul.
                </p>


                <div className="font-bold text-xl lg:text-3xl">3. INSTALE LÂMPADAS DE BAIXO CONUSMO</div>
                <p className="text-2xl mt-7 mb-24">
                    As lâmpadas incandescentes estão a desaparecer, mas a sua transição para as lâmpadas de LED ainda não está tolamente concluída. Se for o seu caso, faça essa alteração. Afinal de contas, as lâmpadas LED podem resultar numa poupança até 90 por cento do seu consumo actual. É que além de gastarem menos, estas lâmpadas têm uma durabilidade maior, podendo ir até 10 anos de vida. O mesmo acontece com os electrodomésticos. Sempre que precisar de substituir um dos aparelhos de casa, opte por modelos mais económicos e mais eficientes energeticamente. Eles até podem representar um investimento maior, mas a médio e longo prazo vão justificaresse gasto maior sem qualquer margem para dúvidas.
                </p>

                <div className="font-bold text-xl lg:text-3xl">4. REFORCE O ISOLAMENTO TÉRMICO</div>
                <p className="text-2xl mt-7 mb-24">
                    Como já referimos acima, um dos grandes problemas das casas em Portugal prende-se com a sua deficiente construção, que se reflecte num deficiente isolamento térmico. Tudo isso cria um ciclo vicioso, já que vai exigir um maior recurso a equipamento de aquecimento e, claro, um consequente aumento da factura da electricidade ao fim do mês. O isolamento térmico das paredes e do pavimento é assim uma intervenção que pode fazer na sua propriedade de forma a aumentar a sua eficiência energética, garantindo mais aquecimento no inverno e menor sobre-aquecimento no inverno. Também a instalação de janelas de vidros duplos ajudam a potenciar esse isolamento térmico.
                </p>

                <div className="font-bold text-xl lg:text-3xl">5. POUPE ÁGUA</div>
                <p className="text-2xl mt-7 mb-24">
                    A água é um dos recursos mais importantes do mundo e, apesar de o tomarmos por garantido, a sua escassez começa a ser já um problema à escala mundial. Além disso, adoptar estratégias e técnicas para o consumo de água ajudam também a aumentar a eficiência energética da sua propriedade. Assim, opte por instalar torneiras como regulação de fluxo ou autoclismos com sistema de dupla descarga. Além disso, pode também optar por bombas de calor em vez dos tradicionais termoacumuladores ou esquentadores, até porque são também soluções mais ecológicas.
                </p>


                <div className="flex align-middle items-center gap-4 mt-20 mb-24">
                    <div className="font-bold text-2xl ">Partilhar</div>
                    <Link href="/"><a ><RiFacebookCircleLine className=" text-primary-500 text-3xl" /></a></Link>
                    <Link href="/"><a ><IoLogoInstagram className=" text-primary-500 text-3xl" /></a></Link>
                    <Link href="/"><a ><GrTwitter className=" text-primary-500 text-3xl" /></a></Link>
                </div>
            </div>
        </section>
    );
};

export default DicasConsumoHero;

