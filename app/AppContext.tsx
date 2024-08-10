import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

import { usePathname } from "next/navigation";

interface AppContextType {
  initialActive: boolean;
  setInitialActive: Dispatch<SetStateAction<boolean>>;
  scrollPosition: boolean;
  setScrollPosition: Dispatch<SetStateAction<boolean>>;
  isScrollDisabled: boolean;
  setScrollDisabled: (disabled: boolean) => void;
  isExiting: boolean;
  setIsExiting: Dispatch<SetStateAction<boolean>>;
  navActive: boolean;
  setNavActive: Dispatch<SetStateAction<boolean>>;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [initialActive, setInitialActive] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [isScrollDisabled, setScrollDisabled] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathName = usePathname();
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    if (pathName === "/") return;

    isScrollDisabled
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isScrollDisabled]);

  return (
    <AppContext.Provider
      value={{
        initialActive,
        setInitialActive,
        scrollPosition,
        setScrollPosition,
        isScrollDisabled,
        setScrollDisabled,
        isExiting,
        setIsExiting,
        navActive,
        setNavActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
