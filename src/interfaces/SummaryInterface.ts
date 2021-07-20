import { IVehicle } from "./VehicleInterface";

export interface ISummary {
  id: number;
  name: string;
  vehicles: IVehicle[];
}
