import { ReactNode, useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Advertisement } from "../models/advertisement";

/* Senhorio anuncio context */
const ModalMaisFiltrosContext = createContext<boolean>(false);
const SetModalMaisFiltrosContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

interface ModalMaisFiltrosProviderProps {
  children: ReactNode;
}

export const ModalMaisFiltrosProvider = ({ children }: ModalMaisFiltrosProviderProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <ModalMaisFiltrosContext.Provider value={modalIsOpen}>
      <SetModalMaisFiltrosContext.Provider value={setModalIsOpen}>{children}</SetModalMaisFiltrosContext.Provider>
    </ModalMaisFiltrosContext.Provider>
  );
};

export const useGetModalMaisFiltros = () => {
  return useContext(ModalMaisFiltrosContext);
};

export const useSetModalMaisFiltros = () => {
  const setModalOpen = useContext(SetModalMaisFiltrosContext);
  return (isOpen: boolean): void => {
    setModalOpen(isOpen);
  };
};
