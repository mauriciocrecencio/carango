import { useContext, useState } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import List from "@material-ui/core/List";
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Modal,
  Button,
  ListSubheader,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModalEditBrand from "../../components/BrandsModal";
import { IBrand } from "../../interfaces/BrandInterface";
import ContainerPages from "../ContainerPages";

const Brands = () => {
  const { brands, setBrands } = useContext(BrandsContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreatingNewBrand, setIsCreatingNewBrand] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<IBrand>();

  const removeBrand = (id: number) => {
    setBrands(brands.filter((brand: IBrand) => brand.id !== id));
  };

  const editBrand = (vehicleBrand: IBrand) => {
    setSelectedBrand(vehicleBrand);
    setIsEdit(true);
  };

  const updateBrand = (inputBrandValue: string) => {
    if (!selectedBrand) return;
    const brandsListUpdated = [...brands];
    const newBrand = { id: selectedBrand.id, name: inputBrandValue };
    brandsListUpdated.splice(brands.indexOf(selectedBrand), 1, newBrand);
    setBrands(brandsListUpdated);
    setIsEdit(false);
  };

  const createNewBrand = (inputBrandValue: string) => {
    const brandsListUpdated = [...brands];
    const newBrand = {
      id: brands.reduce((prev, current) => (+prev.id > +current.id ? prev : current)).id + 1,
      name: inputBrandValue,
    };
    brandsListUpdated.push(newBrand);
    setBrands(brandsListUpdated);
    setIsCreatingNewBrand(false);
  };

  return (
    <ContainerPages>
      <Button
        onClick={() => setIsCreatingNewBrand(true)}
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: "20px 60px 40px" }}
      >
        Criar nova Marca
      </Button>
      <Modal open={isCreatingNewBrand}>
        <ModalEditBrand
          title="Criar nova marca de veículo"
          onConfirm={createNewBrand}
          setIsEdit={setIsCreatingNewBrand}
        />
      </Modal>
      <List
        style={{ maxHeight: 600, overflow: "auto" }}
        subheader={
          <ListSubheader
            color="primary"
            style={{ fontSize: 18, fontWeight: "bold", backgroundColor: "#fff" }}
          >
            Marcas de veículos
          </ListSubheader>
        }
      >
        {brands.map((vehicleBrand, index) => (
          <ListItem key={index} style={index % 2 === 0 ? { backgroundColor: "#ddd9d976" } : {}}>
            <ListItemText>{vehicleBrand.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => editBrand(vehicleBrand)} edge="end" aria-label="delete">
                <EditIcon color="action" />
              </IconButton>
              <IconButton
                onClick={() => removeBrand(vehicleBrand.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Modal open={isEdit} style={{ marginTop: 100 }}>
          <ModalEditBrand
            title={`Editando marca: ${selectedBrand?.name}`}
            onConfirm={updateBrand}
            brand={selectedBrand}
            setIsEdit={setIsEdit}
          />
        </Modal>
      </List>
    </ContainerPages>
  );
};
export default Brands;
