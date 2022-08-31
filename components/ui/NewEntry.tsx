import { ChangeEvent, useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddButton from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "../../context/entries";

export const NewEntry = () => {
  const [isAdding, setisAdding] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const { addNewEntry } = useContext(EntriesContext);

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setisAdding(false)
    setInputValue("");
    setIsTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && isTouched && "Ingrese un valor"
            }
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setIsTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => setisAdding(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          endIcon={<AddButton />}
          fullWidth
          variant="outlined"
          onClick={() => setisAdding(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
