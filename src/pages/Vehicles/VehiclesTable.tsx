import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IBrand } from "../../interfaces/BrandInterface";
import { IVehicle } from "../../interfaces/VehicleInterface";

const tableHeader = ["Modelo", "Marca", "Ano", "Valor", "", ""];

interface PropsVehiclesTable {
  isCreatingNewVehicle: boolean;
  setIsCreatingNewVehicle: (bool: boolean) => void;
  editVehicle: (vehicle: IVehicle) => void;
  removeVehicle: (vehicleId: number) => void;
  vehicles: IVehicle[];
  brands: IBrand[];
}

const VehiclesTable = ({
  isCreatingNewVehicle,
  setIsCreatingNewVehicle,
  editVehicle,
  removeVehicle,
  vehicles,
  brands,
}: PropsVehiclesTable) => {
  const valueFormatter = (number: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(+number);

  return (
    <TableContainer>
      <Table style={{ marginTop: 20 }}>
        <TableHead style={{ backgroundColor: "#ddd9d976" }}>
          <TableRow>
            {tableHeader.map((field, index) =>
              field === "Valor" ? (
                <TableSortLabel>
                  <TableCell style={{ fontWeight: "bold" }} key={index}>
                    {field}
                  </TableCell>
                </TableSortLabel>
              ) : (
                <TableCell style={{ fontWeight: "bold" }} key={index}>
                  {field}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle, index) => (
            <TableRow key={index}>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{brands.find((brand) => brand.id === vehicle.brandId)?.name}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{valueFormatter(vehicle.value)}</TableCell>

              <TableCell>
                <IconButton onClick={() => editVehicle(vehicle)} edge="end" aria-label="delete">
                  <EditIcon color="action" />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeVehicle(vehicle.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehiclesTable;
