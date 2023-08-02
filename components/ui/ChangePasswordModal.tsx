import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { emailRegExp as isValidEmail } from "../../utils";
import { useRouter } from "next/router";
import { passwordRegExp as isValidPassword } from "../../utils";

interface Props {
  open: boolean;
  email: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface formProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ChangePasswordModal: FC<Props> = ({ open, setOpen, email }) => {
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<formProps>({
    email: "",
    confirmPassword: "",
    password: "",
  });
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setTouched(false);
  };

  const changePassword = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/change-pass/${form.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: form.password }),
        method: "PATCH",
      }
    );
    const data = await resp.json().catch((e) => console.log(e));
    if (data.success) {
      sessionStorage.setItem("token", data.token);
      router.push("/");
    }
  };

  const handlerPassword = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const changeVisibility = () => {
    const passwordinput = document.getElementById("change-password");
    const type =
      passwordinput?.getAttribute("type") === "password" ? "text" : "password";
    passwordinput?.setAttribute("type", type);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>Cambia tu contraseña</DialogContentText>
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
          onChange={handlerPassword}
        />
        <TextField
          id={"change-password"}
          margin={"normal"}
          type={"password"}
          placeholder={"Password"}
          fullWidth
          helperText={
            !isValidPassword.test(form.password) &&
            touched &&
            "Password is not secure"
          }
          error={!isValidPassword.test(form.password) && touched}
          name={"password"}
          InputProps={{
            endAdornment: <VisibilityOutlinedIcon onClick={changeVisibility} />,
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerPassword}
        />
        <TextField
          margin={"normal"}
          type={"password"}
          placeholder={"Password"}
          fullWidth
          helperText={
            form.password !== form.confirmPassword &&
            touched &&
            "Passwords do not match"
          }
          error={form.password !== form.confirmPassword && touched}
          name={"confirmPassword"}
          InputProps={{
            endAdornment: <VisibilityOutlinedIcon />,
          }}
          onBlur={() => setTouched(true)}
          onChange={handlerPassword}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={
            form.password !== form.confirmPassword ||
            !isValidPassword.test(form.password)
          }
          onClick={changePassword}
        >
          change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};
