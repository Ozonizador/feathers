import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from "react";
import { Reservation } from "../models/reservation";

interface ModalDetalhesPagamentoProps {
  children: ReactElement;
}

// Context Modal Open Share
const ModalDetalhesPagamentoContext = createContext<boolean>(false);
const SetModalDetalhesPagamentoContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export const ModalDetalhesPagamentoProvider = ({ children }: ModalDetalhesPagamentoProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModalDetalhesPagamentoContext.Provider value={modalOpen}>
      <SetModalDetalhesPagamentoContext.Provider value={setModalOpen}>
        {children}
      </SetModalDetalhesPagamentoContext.Provider>
    </ModalDetalhesPagamentoContext.Provider>
  );
};

export function useModalDetalhesPagamento() {
  const modalOpen = useContext(ModalDetalhesPagamentoContext);
  return modalOpen;
}

export function useSetModalDetalhesPagamentoOpen() {
  const setModalOpen = useContext(SetModalDetalhesPagamentoContext);
  return (value: boolean) => {
    setModalOpen(value);
  };
}

/* Avaliar Experiencia */

interface ModalAvaliarExperienciaProps {
  children: ReactElement;
}

interface ModaAvaliarExperienceContextElements {
  reservation: Reservation;
  isOpen: boolean;
  step: number;
}

const ModalAvaliarExperienciaContext = createContext<ModaAvaliarExperienceContextElements>({
  isOpen: false,
  reservation: null,
  step: 1,
});
const SetModalAvaliarExperienciaContext = createContext<Dispatch<SetStateAction<ModaAvaliarExperienceContextElements>>>(
  () => {}
);

export const ModalApplyShowProvider = ({ children }: ModalAvaliarExperienciaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModaAvaliarExperienceContextElements>({
    isOpen: false,
    reservation: null,
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

/**
 * Report Advertisement
 *
 */

interface ModalReportAnuncioProps {
  children: ReactElement;
}

interface ModalReportContextElements {
  reservation: Reservation;
  isOpen: boolean;
  step: number;
}

const ModalReportarAnuncioContext = createContext<ModalReportContextElements>({
  isOpen: false,
  reservation: null,
  step: 1,
});
const SetModalReportarAnuncioContext = createContext<Dispatch<SetStateAction<ModalReportContextElements>>>(() => {});

export const ModalReportarAnuncioProvider = ({ children }: ModalReportAnuncioProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalReportContextElements>({ isOpen: false, reservation: null, step: 1 });

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
  reservation: Reservation;
  isOpen: boolean;
  step: number;
}

const ModalAlterarReservaContext = createContext<ModalAlterReservaElements>({
  isOpen: false,
  reservation: null,
  step: 1,
});
const SetModalAlterarReservaContext = createContext<Dispatch<SetStateAction<ModalAlterReservaElements>>>(() => {});

export const ModalAlterarReservaProvider = ({ children }: ModalAlterarReversaProps): JSX.Element => {
  const [modalInfo, setModalInfo] = useState<ModalAlterReservaElements>({ isOpen: false, reservation: null, step: 1 });

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
  return (report: ModalReportContextElements) => {
    setModalReport(report);
  };
}
