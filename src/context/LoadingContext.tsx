import { createContext, useState } from "react";

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
}>(null!);

export const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
