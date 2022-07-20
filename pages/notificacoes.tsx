import Breadcrumb from "../components/notifications/Breadcrumbs/Breadcrumb";
import NotificationCard from "../components/notifications/NotificationCard/NotificationCard";

const notificacoes = () => {
  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-16 w-3/5">
        <NotificationCard />
        <NotificationCard />
      </div>
    </>
  );
};

export default notificacoes;
