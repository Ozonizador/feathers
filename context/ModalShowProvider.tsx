import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from "react";

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

const ModalAvaliarExperienciaContext = createContext<boolean>(false);
const SetModalAvaliarExperienciaContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export const ModalApplyShowProvider = ({ children }: ModalAvaliarExperienciaProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModalAvaliarExperienciaContext.Provider value={modalOpen}>
      <SetModalAvaliarExperienciaContext.Provider value={setModalOpen}>
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
  return (value: boolean) => {
    setModalApplyOpen(value);
  };
}

/* Report Advertisement */

interface ModalReportAnuncioProps {
  children: ReactElement;
}

const ModalReportarAnuncioContext = createContext<boolean>(false);
const SetModalReportarAnuncioContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export const ModalReportarAnuncioProvider = ({ children }: ModalReportAnuncioProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModalReportarAnuncioContext.Provider value={modalOpen}>
      <SetModalReportarAnuncioContext.Provider value={setModalOpen}>{children}</SetModalReportarAnuncioContext.Provider>
    </ModalReportarAnuncioContext.Provider>
  );
};

export function useModalReportAdvertisement() {
  const modalApplyOpen = useContext(ModalReportarAnuncioContext);
  return modalApplyOpen;
}

export function useSetModalReportAdvertisement() {
  const setModalApplyOpen = useContext(SetModalReportarAnuncioContext);
  return (value: boolean) => {
    setModalApplyOpen(value);
  };
}

/* Modal Alterar Reserva */

interface ModalAlterarReversaProps {
  children: ReactElement;
}

const ModalAlterarReservaContext = createContext<boolean>(false);
const SetModalAlterarReservaContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export const ModalAlterarReservaProvider = ({ children }: ModalAlterarReversaProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModalAlterarReservaContext.Provider value={modalOpen}>
      <SetModalAlterarReservaContext.Provider value={setModalOpen}>{children}</SetModalAlterarReservaContext.Provider>
    </ModalAlterarReservaContext.Provider>
  );
};

export function useModalAlterarReserva() {
  const modalApplyOpen = useContext(ModalAlterarReservaContext);
  return modalApplyOpen;
}

export function useSetModalAlterarReserva() {
  const setModalApplyOpen = useContext(SetModalAlterarReservaContext);
  return (value: boolean) => {
    setModalApplyOpen(value);
  };
}