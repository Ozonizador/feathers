import PicAbout from "../components/perfil/PicAbout";
import AccordionPerfil from "../components/perfil/accordioncard/AccordionPerfil";
import PerfilInfo from "../components/perfil/PerfilInfo";
{
  /* page 61 - 62 XD */
}
const Index = () => {
  return (
    <>
      <div className="lg_px-0 mx-auto mt-24 w-full px-6 lg:w-1/2 ">
        <PicAbout />
        <AccordionPerfil />
        <PerfilInfo />
        {/* <AccordionEstudante /> */}
      </div>
    </>
  );
};

export default Index;
