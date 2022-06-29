import { createContext, useContext, useState } from "react";

const initialValues = {
  session: null,
  user: null,
};

export const UserContext = createContext(null);
export const SetUserContext = createContext(null);

// session
export const SessionContext = createContext(null);
export const SetSessionContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        <SessionContext.Provider value={session}>
          <SetSessionContext.Provider value={setSession}>{children}</SetSessionContext.Provider>
        </SessionContext.Provider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

export const setUser = () => {};
export const getUser = () => {};

export const setSession = () => {};
export const getSession = () => {};
