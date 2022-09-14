import { useState, ChangeEvent, useMemo, FC } from "react";
import { GetServerSideProps } from "next";
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { isValidObjectId } from "mongoose";

import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);

  console.log(props)

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    console.log({ inputValue, status });
  };

  return (
    <Layout title="Entradas">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace ... minutos`}
            />
          </Card>
          <CardContent>
            <TextField
              onBlur={() => setTouched(true)}
              sx={{ maginTo2: 2, marginBottom: 1 }}
              fullWidth
              placeholder="Nueva entrada"
              autoFocus
              multiline
              label="Nueva entrada"
              value={inputValue}
              onChange={onInputValueChange}
              helperText={isNotValid === true && "Ingrese un valor"}
              error={isNotValid === true}
            />
            <FormControl>
              <FormLabel>Estado:</FormLabel>
              <RadioGroup row={true} value={status} onChange={onStatusChanged}>
                {validStatus.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<SaveOutlinedIcon />}
              variant="contained"
              fullWidth
              onClick={onSave}
              disabled={isNotValid}
            >
              Save
            </Button>
          </CardActions>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry: entry
    },
  };
};

export default EntryPage;
