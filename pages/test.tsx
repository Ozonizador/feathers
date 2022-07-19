import ModalAlterarReserva from "../components/modals/ModalAlteralReserva";
import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";
import ModalDenuncia from "../components/modals/ModalDenuncia";
// import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";
const Index = (): JSX.Element => {
  return (
    <div className="flex flex-1 justify-center p-10">
      <ModalAvaliarExperiencia defaultOpen={true} />
      {/* <ModalDenuncia defaultOpen={false} /> */}
      {/* <ModalAlterarReserva defaultOpen={true} /> */}
    </div>
  );
};

export default Index;
