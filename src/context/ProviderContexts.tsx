import { ReactNode } from "react";
import { BrandsProvider } from "./BrandsContext";
import { LoadingProvider } from "./LoadingContext";
import { VehiclesProvider } from "./VehiclesContext";

const ProviderContexts = ({ children }: { children: ReactNode }) => {
  return (
    <BrandsProvider>
      <VehiclesProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </VehiclesProvider>
    </BrandsProvider>
  );
};
export default ProviderContexts;
