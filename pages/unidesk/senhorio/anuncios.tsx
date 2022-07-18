/* PAGINA 51 DO XD */
import Breadcrumb from "../../../components/senhorioanuncios/breadcrumb/breadcrumb"
import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard"
import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";


  const Anuncios = () => {
    return (
      <section>
        <Breadcrumb />
  
        <div className="container mx-auto my-16 w-4/6 rounded-2xl  py-20 bg-terciary-300 ">
          <div className="flex  px-12 gap-10">
            <div><HospedesMenu activeLink="hospedes" /></div>
            <div className="w-full"><AnuncioCard /></div>

          </div>
        </div>
      </section>
    );
  };
  
  export default Anuncios;
  