import { Button, Container, TextField, Box } from "@material-ui/core";
import { useState } from "react";
import { IBrand } from "../../interfaces/BrandInterface";

interface IPropsEditBrandModal {
  brand?: IBrand;
  setIsEdit: (bool: boolean) => void;
  onConfirm: (inputValue: string) => void;
  title: string;
}

const EditBrandModal = ({ brand, setIsEdit, onConfirm, title }: IPropsEditBrandModal) => {
  const [inputBrandValue, setInputBrandValue] = useState("");
  return (
    <Container style={{ backgroundColor: "#FFF", borderRadius: "14px" }} maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        style={{ justifyContent: "space-around" }}
        height={300}
      >
        <h3>{title}</h3>
        <TextField
          value={inputBrandValue}
          onChange={(e) => setInputBrandValue(e.target.value)}
          variant="filled"
          type="text"
          placeholder={brand?.name}
          id="brand"
        />
        <Button variant="contained" color="primary" onClick={() => onConfirm(inputBrandValue)}>
          Confirmar
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)}>
          Cancelar
        </Button>
      </Box>
    </Container>
  );
};

export default EditBrandModal;
