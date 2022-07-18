/* PAGINA 51 DO XD */
import Breadcrumb from "../../../components/senhorioanuncios/breadcrumb/breadcrumb";
import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard";
import MenuAnuncio from "../../../components/unidesk/Menus/MenuSenhorioAnuncio";
import MiniCard from "../../../components/senhorioanuncios/minicards/MiniCards";

const Anuncios = () => {
  return (
    <section>
      <Breadcrumb />

      <div className="container mx-auto my-16 w-4/6 rounded-2xl  bg-terciary-300 py-20 ">
        <div className="flex  gap-10 px-12">
          <div>
            <MenuAnuncio />
          </div>

          <div className="flex-row">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <AnuncioCard />
              </div>
              <div className="w-full">
                <AnuncioCard />
              </div>
            </div>

            <div>
              <MiniCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anuncios;
