import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from "react";
import { Reservation, ReservationComplete } from "../models/reservation";

interface ModalDetalhesPagamentoProps {
  children: ReactElement;
}

interface ModalAdvertPageProps {
  detailsModalOpen: boolean;
  reviewsModalOpen: boolean;
  generateReferenceModalOpen: boolean;
}

// Context Modal Open Share
const ModalsAdvertPageContext = createContext<ModalAdvertPageProps>({
  detailsModalOpen: false,
  reviewsModalOpen: false,
  generateReferenceModalOpen: false,
});
const SetModalsAdvertPageContext = createContext<Dispatch<SetStateAction<ModalAdvertPageProps>>>(() => {});

export const ModalAnuncioInfoProvider = ({ children }: ModalDetalhesPagamentoProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<ModalAdvertPageProps>({
    detailsModalOpen: false,
    reviewsModalOpen: false,
    generateReferenceModalOpen: false,
  });

  return (
    <ModalsAdvertPageContext.Provider value={modalOpen}>
      <SetModalsAdvertPageContext.Provider value={setModalOpen}>{children}</SetModalsAdvertPageContext.Provider>
    </ModalsAdvertPageContext.Provider>
  );
};

export function useModaisAnuncioDetalhes() {
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

export function useSetModalGerarReferencia() {
  const setModal = useContext(SetModalsAdvertPageContext);
  return (value: boolean) => {
    setModal((currentValue) => ({ ...currentValue, generateReferenceModalOpen: value }));
  };
}

/* Avaliar Experiencia */

interface ModalAvaliarExperienciaProps {
  children: ReactElement;
}

interface ModaAvaliarExperienceContextElements {
  reservation?: ReservationComplete;
  isOpen: boolean;
  step: number;
}

const ModalAvaliarExperienciaContext = createContext<ModaAvaliarExperienceContextElements>({
  isOpen: false,
  reservation: undefined,
  step: 1,
});
const SetModalAvaliarExperienciaContext = createContext<Dispatch<SetStateAction<ModaAvaliarExperienceContextElements>>>(
  () => {}
);

export const ModalApplyShowProvider = ({ children }: ModalAvaliarExperienciaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModaAvaliarExperienceContextElements>({
    isOpen: false,
    reservation: undefined,
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
  reservation?: ReservationComplete;
  isOpen: boolean;
  step: number;
}

const ModalReportarAnuncioContext = createContext<ModalReportContextElements>({
  isOpen: false,
  reservation: undefined,
  step: 1,
});
const SetModalReportarAnuncioContext = createContext<Dispatch<SetStateAction<ModalReportContextElements>>>(() => {});

export const ModalReportarAnuncioProvider = ({ children }: ModalReportAnuncioProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalReportContextElements>({
    isOpen: false,
    reservation: undefined,
    step: 1,
  });

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
    setModalReport((oldStatus) => report);
  };
}

/**
 * Modal Alterar Reserva
 */

interface ModalAlterarReversaProps {
  children: ReactElement;
}

interface ModalAlterReservaElements {
  reservation?: ReservationComplete;
  isOpen: boolean;
  step: number;
}

const ModalAlterarReservaContext = createContext<ModalAlterReservaElements>({
  isOpen: false,
  reservation: undefined,
  step: 1,
});
const SetModalAlterarReservaContext = createContext<Dispatch<SetStateAction<ModalAlterReservaElements>>>(() => {});

export const ModalAlterarReservaProvider = ({ children }: ModalAlterarReversaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalAlterReservaElements>({
    isOpen: false,
    reservation: undefined,
    step: 1,
  });

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

/**
 * Modal Gerar Referencia
 */

interface ModalAlterarReversaProps {
  children: ReactElement;
}

type InfoModalReferencia = {
  reservation?: Reservation;
  value?: number;
  phone?: string;
};

const ModalGerarReferenciaContext = createContext<InfoModalReferencia>({
  reservation: undefined,
  value: undefined,
  phone: undefined,
});
const SetModalGerarReferenciaContext = createContext<Dispatch<SetStateAction<InfoModalReferencia>>>(() => {});

export const ModalGerarReferenciaProvider = ({ children }: ModalAlterarReversaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<InfoModalReferencia>({
    reservation: undefined,
    value: undefined,
    phone: undefined,
  });

  return (
    <ModalGerarReferenciaContext.Provider value={modalInfo}>
      <SetModalGerarReferenciaContext.Provider value={setModalInfo}>{children}</SetModalGerarReferenciaContext.Provider>
    </ModalGerarReferenciaContext.Provider>
  );
};

export function useModalGerarReferencia() {
  const modalReferenciaInfo = useContext(ModalGerarReferenciaContext);
  return modalReferenciaInfo;
}

export function useSetModalGerarReferenciaInfo() {
  const setModalInfoReferencia = useContext(SetModalGerarReferenciaContext);
  return (info: InfoModalReferencia) => {
    setModalInfoReferencia(info);
  };
}

export function useSetModalGerarReferenciaReservation() {
  const modalReferenciaInfo = useContext(ModalGerarReferenciaContext);
  const setModalInfoReferencia = useContext(SetModalGerarReferenciaContext);
  return (reservation: Reservation) => {
    setModalInfoReferencia({ ...modalReferenciaInfo, reservation });
  };
}

export function useSetModalGerarReferenciaValue() {
  const modalReferenciaInfo = useContext(ModalGerarReferenciaContext);
  const setModalInfoReferencia = useContext(SetModalGerarReferenciaContext);
  return (value: number) => {
    setModalInfoReferencia({ ...modalReferenciaInfo, value });
  };
}

export function useSetModalGerarReferenciaPhone() {
  const modalReferenciaInfo = useContext(ModalGerarReferenciaContext);
  const setModalInfoReferencia = useContext(SetModalGerarReferenciaContext);
  return (phone: string) => {
    setModalInfoReferencia({ ...modalReferenciaInfo, phone });
  };
}
