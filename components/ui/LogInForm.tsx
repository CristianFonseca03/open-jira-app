import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  AlertColor,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { emailRegExp as isValidEmail } from "../../utils";
import { signIn, useSession } from "next-auth/react";
import { ForgotPassword } from "./ForgotPassword";

interface formProps {
  password: string;
  email: string;
}

export const LogInForm = () => {
  const { data: session } = useSession();


  const router = useRouter();
  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
  });
  const [snackBarStatus, setSnackBarStatus] = useState<AlertColor>("success");
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let isValidForm = true;

  //TODO: validate route
  const handlerForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginUser = async () => {
    await signIn("credentials", {
      ...form,
    });
  };

  useEffect(() => {
    if (session?.user?.image) {
      setShowModal(true);
    } else if (session && !session?.user?.image) {
      router.push("/");
    }
  }, [router, session, session?.user?.image]);

  const handleClose = () => {
    setOpen(false);
  };

  const changeVisibility = () => {
    const passwordinput = document.getElementById("password");
    const type =
      passwordinput?.getAttribute("type") === "password" ? "text" : "password";
    passwordinput?.setAttribute("type", type);
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
      <Grid item xs={12}>
        <TextField
          autoComplete={"off"}
          type={"text"}
          placeholder={"Correo"}
          fullWidth
          helperText={
            touched && !isValidEmail.test(form.email) && "Correo no es válido"
          }
          error={touched && !isValidEmail.test(form.email)}
          name={"email"}
          InputProps={{
            endAdornment: <EmailOutlinedIcon />,
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerForm}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={"password"}
          type={"password"}
          // type={'text'}
          placeholder={"Contraseña"}
          fullWidth
          helperText={
            form.password.length <= 0 && touched && "La contraseña es requerida"
          }
          error={form.password.length <= 0 && touched}
          name={"password"}
          InputProps={{
            endAdornment: (
              <VisibilityOutlinedIcon
                onClick={changeVisibility}
                style={{ cursor: "pointer" }}
              />
            ),
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerForm}
        />
        {
          //TODO: create modal for send email
        }
        <Typography
          pt={2}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenPassword(true);
          }}
        >
          ¿Olvidaste tu contraseña?
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Link href={"/sign-up"} passHref>
          <Button
            fullWidth
            variant={"contained"}
            style={{ borderRadius: "50px", padding: "12px 0" }}
          >
            Registrate
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
          onClick={loginUser}
          disabled={validForm()}
        >
          Iniciar Sesión
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
      <ChangePasswordModal
        open={showModal}
        setOpen={setShowModal}
        email={form.email || ""}
      />
      <ForgotPassword open={openPassword} setOpen={setOpenPassword} />
    </Grid>
  );
};
