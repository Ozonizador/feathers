import ModalAvaliarExperiencia from "../components/modals/ModalAvaliarExperiencia";

const Index = (): JSX.Element => {
  return (
    <div className="flex flex-1 justify-center p-10">
      <ModalAvaliarExperiencia defaultOpen={true} />
    </div>
  );
};

export default Index;
