import { ChangeEvent, useState } from "react";
import Link from "next/link";
import {
  Alert,
  AlertColor,
  Button,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { emailRegExp as isValidEmail } from "../../utils";

interface formProps {
  name: string;
  lastName: string;
  email: string;
}

export const SignUpForm = () => {
  const [form, setForm] = useState<formProps>({
    name: "",
    lastName: "",
    email: "",
  });
  const [snackBarStatus, setSnackBarStatus] = useState<AlertColor>("success");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  let isValidForm = true;
  const router = useRouter();

  const handlerForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerUser = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/sign-up`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        method: "POST",
      }
    );
    const data = await resp.json();
    if (data.success) {
      setMessage(data.message);
      setSnackBarStatus("success");
      router.push("/sign-in");
    } else {
      setSnackBarStatus("error");
      setMessage(data.message || "Error al crear el usuario");
    }
    setOpen(true);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validForm = (): boolean => {
    Object.keys(form).forEach((value) => {
      // @ts-ignore
      if (form[value].length === 0) {
        isValidForm = false;
      }
    });
    return !isValidForm;
  };

  return (
    <Grid container spacing={4} pt={4}>
      <Grid item xs={6}>
        <TextField
          type={"text"}
          placeholder={"Nombre"}
          fullWidth
          helperText={
            form.name.length <= 0 && touched && "El nombre es requerido"
          }
          error={form.name.length <= 0 && touched}
          InputProps={{
            endAdornment: <BadgeOutlinedIcon />,
          }}
          name={"name"}
          onBlur={() => setTouched(true)}
          onChange={handlerForm}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type={"text"}
          placeholder={"Apellido"}
          fullWidth
          helperText={
            form.lastName.length <= 0 && touched && "El apellido es requerido"
          }
          error={form.lastName.length <= 0 && touched}
          name={"lastName"}
          InputProps={{
            endAdornment: <BadgeOutlinedIcon />,
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerForm}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type={"text"}
          placeholder={"Correo"}
          fullWidth
          helperText={
            !isValidEmail.test(form.email) &&
            touched &&
            "No es un correo válido es válido"
          }
          error={!isValidEmail.test(form.email) && touched}
          name={"email"}
          InputProps={{
            endAdornment: <EmailOutlinedIcon />,
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerForm}
        />
      </Grid>
      <Grid item xs={6}>
        <Link href={"/log-in"} passHref>
          <Button
            fullWidth
            variant={"contained"}
            style={{ borderRadius: "50px", padding: "12px 0" }}
            onClick={handleClick}
          >
            Iniciar sesión
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant={"contained"}
          style={{
            borderRadius: "50px",
            padding: "12px 0",
            backgroundColor: !validForm() ? "#4a148c" : "",
          }}
          onClick={registerUser}
          disabled={validForm()}
        >
          Crear cuenta
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={"top-center"}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarStatus}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
