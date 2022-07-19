import ModalAlterarReserva from "../components/modals/ModalAlteralReserva";
import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";
import ModalDenuncia from "../components/modals/ModalDenuncia";

const Index = (): JSX.Element => {
  return (
    <div className="flex flex-1 justify-center p-10">
      <ModalAvaliarExperiencia defaultOpen={false} />
      <ModalDenuncia defaultOpen={false} />
      <ModalAlterarReserva defaultOpen={true} />
    </div>
  );
};

export default Index;
