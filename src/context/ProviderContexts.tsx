import { ReactNode } from "react";
import { AuthenticationProvider } from "./AuthenticationContext";
import { BrandsProvider } from "./BrandsContext";
import { LoadingProvider } from "./LoadingContext";
import { VehiclesProvider } from "./VehiclesContext";

const ProviderContexts = ({ children }: { children: ReactNode }) => {
  return (
    <AuthenticationProvider>
      <BrandsProvider>
        <VehiclesProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </VehiclesProvider>
      </BrandsProvider>
    </AuthenticationProvider>
  );
};
export default ProviderContexts;
