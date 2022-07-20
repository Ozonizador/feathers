import ModalAlterarReserva from "../components/modals/ModalAlteralReserva";
import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";
import ModalDenuncia from "../components/modals/ModalDenuncia";
// import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";
// import Menu from "../components/unidesk/Menus/MenuSenhorio";
// import Menu from "../components/unidesk/Menus/MenuEstudante";
import Menu from "../components/unidesk/Menus/HospedesMenu";

const Index = (): JSX.Element => {
  return (
    <div className="flex flex-1 justify-center p-10">
      {/* <ModalAvaliarExperiencia defaultOpen={true} /> */}
      {/* <Menu /> */}
      {/* <ModalDenuncia defaultOpen={false} /> */}
      {/* <ModalAlterarReserva defaultOpen={true} /> */}
    </div>
  );
};

export default Index;
