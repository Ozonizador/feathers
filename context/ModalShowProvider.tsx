import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from "react";
import { StayComplete } from "../models/stay";

interface ModalDetalhesPagamentoProps {
  children: ReactElement;
}

interface ModalAdvertPageProps {
  detailsModalOpen: boolean;
  reviewsModalOpen: boolean;
}

// Context Modal Open Share
const ModalsAdvertPageContext = createContext<ModalAdvertPageProps>({
  detailsModalOpen: false,
  reviewsModalOpen: false,
});
const SetModalsAdvertPageContext = createContext<Dispatch<SetStateAction<ModalAdvertPageProps>>>(() => {});

export const ModalAnuncioInfoProvider = ({ children }: ModalDetalhesPagamentoProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<ModalAdvertPageProps>({
    detailsModalOpen: false,
    reviewsModalOpen: false,
  });

  return (
    <ModalsAdvertPageContext.Provider value={modalOpen}>
      <SetModalsAdvertPageContext.Provider value={setModalOpen}>{children}</SetModalsAdvertPageContext.Provider>
    </ModalsAdvertPageContext.Provider>
  );
};

export function useModalDetalhesPagamento() {
  const modalOpen = useContext(ModalsAdvertPageContext);
  return modalOpen;
}

export function useSetModalDetalhesPagamento() {
  const setModal = useContext(SetModalsAdvertPageContext);
  return (value: boolean) => {
    setModal((currentValue) => ({ ...currentValue, detailsModalOpen: value }));
  };
}

export function useSetModalReviews() {
  const setModal = useContext(SetModalsAdvertPageContext);
  return (value: boolean) => {
    setModal((currentValue) => ({ ...currentValue, reviewsModalOpen: value }));
  };
}

/* Avaliar Experiencia */

interface ModalAvaliarExperienciaProps {
  children: ReactElement;
}

interface ModaAvaliarExperienceContextElements {
  stay: StayComplete;
  isOpen: boolean;
  step: number;
}

const ModalAvaliarExperienciaContext = createContext<ModaAvaliarExperienceContextElements>({
  isOpen: false,
  stay: null,
  step: 1,
});
const SetModalAvaliarExperienciaContext = createContext<Dispatch<SetStateAction<ModaAvaliarExperienceContextElements>>>(
  () => {}
);

export const ModalApplyShowProvider = ({ children }: ModalAvaliarExperienciaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModaAvaliarExperienceContextElements>({
    isOpen: false,
    stay: null,
    step: 1,
  });

  return (
    <ModalAvaliarExperienciaContext.Provider value={modalInfo}>
      <SetModalAvaliarExperienciaContext.Provider value={setModalInfo}>
        {children}
      </SetModalAvaliarExperienciaContext.Provider>
    </ModalAvaliarExperienciaContext.Provider>
  );
};

export function useModalAvaliarExperiencia() {
  const modalApplyOpen = useContext(ModalAvaliarExperienciaContext);
  return modalApplyOpen;
}

export function useSetModalAvaliarExperiencia() {
  const setModalApplyOpen = useContext(SetModalAvaliarExperienciaContext);
  return (modalInfo: ModaAvaliarExperienceContextElements) => {
    setModalApplyOpen(modalInfo);
  };
}

export function useSetOpenModalAvaliarExperiencia() {
  const avaliarModalInfo = useContext(ModalAvaliarExperienciaContext);
  const setModalApplyOpen = useContext(SetModalAvaliarExperienciaContext);
  return (value: boolean) => {
    setModalApplyOpen({ ...avaliarModalInfo, isOpen: value });
  };
}

export function useSetModalAvaliarExperienciaContextProperty() {
  const reportModal = useContext(ModalAvaliarExperienciaContext);
  const setModalApplyOpen = useContext(SetModalAvaliarExperienciaContext);
  return (property: string, value: any) => {
    setModalApplyOpen({ ...reportModal, [property]: value });
  };
}

/**
 * Report Advertisement
 */

interface ModalReportAnuncioProps {
  children: ReactElement;
}

interface ModalReportContextElements {
  stay: StayComplete;
  isOpen: boolean;
  step: number;
}

const ModalReportarAnuncioContext = createContext<ModalReportContextElements>({
  isOpen: false,
  stay: null,
  step: 1,
});
const SetModalReportarAnuncioContext = createContext<Dispatch<SetStateAction<ModalReportContextElements>>>(() => {});

export const ModalReportarAnuncioProvider = ({ children }: ModalReportAnuncioProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalReportContextElements>({ isOpen: false, stay: null, step: 1 });

  return (
    <ModalReportarAnuncioContext.Provider value={modalInfo}>
      <SetModalReportarAnuncioContext.Provider value={setModalInfo}>{children}</SetModalReportarAnuncioContext.Provider>
    </ModalReportarAnuncioContext.Provider>
  );
};

export function useModalReportAdvertisement() {
  const modalApplyOpen = useContext(ModalReportarAnuncioContext);
  return modalApplyOpen;
}

export function useSetModalReportContextProperty() {
  const reportModal = useContext(ModalReportarAnuncioContext);
  const setModalApplyOpen = useContext(SetModalReportarAnuncioContext);
  return (property: string, value: any) => {
    setModalApplyOpen({ ...reportModal, [property]: value });
  };
}

export function useSetOpenModalReport() {
  const reportModal = useContext(ModalReportarAnuncioContext);
  const setModalReport = useContext(SetModalReportarAnuncioContext);
  return (value: boolean) => {
    setModalReport({ ...reportModal, isOpen: value });
  };
}

export function useSetModalReportAdvertisement() {
  const setModalReport = useContext(SetModalReportarAnuncioContext);
  return (report: ModalReportContextElements) => {
    setModalReport(report);
  };
}

/**
 * Modal Alterar Reserva
 */

interface ModalAlterarReversaProps {
  children: ReactElement;
}

interface ModalAlterReservaElements {
  stay: StayComplete;
  isOpen: boolean;
  step: number;
}

const ModalAlterarReservaContext = createContext<ModalAlterReservaElements>({
  isOpen: false,
  stay: null,
  step: 1,
});
const SetModalAlterarReservaContext = createContext<Dispatch<SetStateAction<ModalAlterReservaElements>>>(() => {});

export const ModalAlterarReservaProvider = ({ children }: ModalAlterarReversaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalAlterReservaElements>({ isOpen: false, stay: null, step: 1 });

  return (
    <ModalAlterarReservaContext.Provider value={modalInfo}>
      <SetModalAlterarReservaContext.Provider value={setModalInfo}>{children}</SetModalAlterarReservaContext.Provider>
    </ModalAlterarReservaContext.Provider>
  );
};

export function useModalAlterarReserva() {
  const modalApplyOpen = useContext(ModalAlterarReservaContext);
  return modalApplyOpen;
}

export function useSetOpenModalAlterarReserva() {
  const changeReservationModal = useContext(ModalAlterarReservaContext);
  const setModalApplyOpen = useContext(SetModalAlterarReservaContext);
  return (value: boolean) => {
    setModalApplyOpen({ ...changeReservationModal, isOpen: value });
  };
}

export function useSetModalAlterarReserva() {
  const setModalReport = useContext(SetModalAlterarReservaContext);
  return (report: ModalAlterReservaElements) => {
    setModalReport(report);
  };
}
