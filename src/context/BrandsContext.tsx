import { createContext, useEffect, useState } from "react";
import { API } from "../services/apiService";
import { IBrand } from "../interfaces/BrandInterface";
import db from '../constants.json'

export const BrandsContext = createContext<{
  brands: IBrand[];
  setBrands: (brands: IBrand[]) => void;
}>(null!);

export const BrandsProvider: React.FC = ({ children }) => {
  const [brands, setBrands] = useState<IBrand[]>(db.brands);

  // const getBrands = async () => await API.get("/brands");

  // useEffect(() => {
  //   getBrands().then((res) => setBrands(res.data));
  // }, []);

  return <BrandsContext.Provider value={{ brands, setBrands }}>{children}</BrandsContext.Provider>;
};
