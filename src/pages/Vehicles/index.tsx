import { Button, Modal } from "@material-ui/core";
import { useContext, useState } from "react";
import EditVehicleModal from "../../components/VehiclesModal";
import { BrandsContext } from "../../context/BrandsContext";
import { VehiclesContext } from "../../context/VehiclesContext";
import { IVehicle } from "../../interfaces/VehicleInterface";
import VehiclesTable from "./VehiclesTable";

const Vehicles = () => {
  const [isCreatingNewVehicle, setIsCreatingNewVehicle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle>();
  const { vehicles, setVehicles } = useContext(VehiclesContext);
  const { brands } = useContext(BrandsContext);

  const createNewVehicle = (vehicleInputData: Omit<IVehicle, "id">) => {
    const { model, year, value, brandId } = vehicleInputData;
    const vehiclesListUpdated = [...vehicles];
    const newVehicle = {
      id: vehicles.reduce((prev, current) => (+prev.id > +current.id ? prev : current)).id + 1,
      model,
      year,
      value,
      brandId,
    };
    vehiclesListUpdated.push(newVehicle);
    setVehicles(vehiclesListUpdated);
    setIsCreatingNewVehicle(false);
  };

  const updateVehicle = (inputVehicleData: IVehicle) => {
    const { model, brandId, year, value } = inputVehicleData;
    const vehicleListUpdated = [...vehicles];
    const newVehicle = { id: selectedVehicle!.id, model, brandId, year, value };
    vehicleListUpdated.splice(vehicles.indexOf(selectedVehicle!), 1, newVehicle);
    setVehicles(vehicleListUpdated);
    setIsEdit(false);
  };

  const editVehicle = (vehicle: IVehicle) => {
    setIsEdit(true);
    setSelectedVehicle(vehicle);
  };
  const removeVehicle = (vehicleId: number) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleId));
  };

  return (
    <>
      <Button
        onClick={() => setIsCreatingNewVehicle(true)}
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: "20px 60px 40px" }}
      >
        Criar novo Veículo
      </Button>
      <VehiclesTable
        editVehicle={editVehicle}
        isCreatingNewVehicle={isCreatingNewVehicle}
        setIsCreatingNewVehicle={setIsCreatingNewVehicle}
        removeVehicle={removeVehicle}
        vehicles={vehicles}
        brands={brands}
      />
      <Modal open={isEdit}>
        <EditVehicleModal
          title={`Editando veículo: ${selectedVehicle?.model}`}
          onConfirm={updateVehicle}
          vehicle={selectedVehicle}
          setIsEdit={setIsEdit}
        />
      </Modal>
      <Modal open={isCreatingNewVehicle}>
        <EditVehicleModal
          title="Criar novo veículo"
          onConfirm={createNewVehicle}
          setIsEdit={setIsCreatingNewVehicle}
        />
      </Modal>
    </>
  );
};

export default Vehicles;
