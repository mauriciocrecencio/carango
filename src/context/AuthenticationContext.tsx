import { createContext, useState } from "react";

export const AuthenticationContext = createContext<{
  isAuth: boolean;
  setIsAuth: (bool: boolean) => void;
}>(null!);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthenticationContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
