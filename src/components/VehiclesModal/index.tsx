import {
  Button,
  Container,
  TextField,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useContext, useState, ChangeEvent } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import { IVehicle } from "../../interfaces/VehicleInterface";

interface PropsEditVehicleModal {
  vehicle?: Omit<IVehicle, "id">;
  setIsEdit: (bool: boolean) => void;
  onConfirm: (vehicleData: IVehicle) => void;
  title: string;
}

const EditVehicleModal = ({ vehicle, setIsEdit, onConfirm, title }: PropsEditVehicleModal) => {
  const [inputVehicleData, setInputVehicleData] = useState({
    id: 0,
    model: vehicle ? vehicle.model : "",
    year: vehicle ? vehicle.year : 0,
    value: vehicle ? vehicle.value : 0,
    brandId: vehicle ? +vehicle.brandId : "",
  });
  const { brands } = useContext(BrandsContext);

  return (
    <Container style={{ backgroundColor: "#FFF", borderRadius: "14px" }} maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        style={{ justifyContent: "space-around" }}
        height={700}
      >
        <h3>{title}</h3>

        <InputLabel>Marca</InputLabel>
        <Select
          value={inputVehicleData.brandId}
          onChange={(event: ChangeEvent<{ value: unknown }>) =>
            setInputVehicleData({ ...inputVehicleData, brandId: event.target.value as string })
          }
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          value={inputVehicleData.model}
          onChange={(event) =>
            setInputVehicleData({ ...inputVehicleData, model: event.target.value })
          }
          label="Modelo"
          variant="outlined"
          type="text"
          placeholder={vehicle?.model}
          id="model"
        />
        <TextField
          required
          value={inputVehicleData.year}
          onChange={(event) =>
            setInputVehicleData({ ...inputVehicleData, year: +event.target.value })
          }
          label="Ano"
          variant="outlined"
          type="text"
          placeholder={String(vehicle?.year)}
          id="year"
        />
        <TextField
          required
          value={inputVehicleData.value}
          onChange={(event) =>
            setInputVehicleData({ ...inputVehicleData, value: +event.target.value })
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
          label="Valor"
          variant="outlined"
          type="text"
          placeholder={String(vehicle?.value)}
          id="value"
        />
        <Button variant="contained" color="primary" onClick={() => onConfirm(inputVehicleData)}>
          Confirmar
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)}>
          Cancelar
        </Button>
      </Box>
    </Container>
  );
};

export default EditVehicleModal;
