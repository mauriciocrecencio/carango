import { createContext, useEffect, useState } from "react";
import { API } from "../services/apiService";
import { IVehicle } from "../interfaces/VehicleInterface";
import db from '../constants.json'

export const VehiclesContext = createContext<{
  vehicles: IVehicle[];
  setVehicles: (vehicles: IVehicle[]) => void;
}>(null!);

export const VehiclesProvider: React.FC = ({ children }) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>(db.vehicles);

  // const getVehicles = async () => await API.get("/vehicles");

  // useEffect(() => {
  //   getVehicles().then((res) => setVehicles(res.data));
  // }, []);

  return (
    <VehiclesContext.Provider value={{ vehicles, setVehicles }}>
      {children}
    </VehiclesContext.Provider>
  );
};
