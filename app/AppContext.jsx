import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [initialActive, setInitialActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false);

  return (
    <AppContext.Provider
      value={{
        initialActive,
        setInitialActive,
        scrollPosition,
        setScrollPosition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
