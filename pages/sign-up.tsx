import { NextPage } from "next";
import { SignLayout } from "../components/layouts";
import { Box, Typography } from "@mui/material";
import { SignUpForm } from "../components/ui/";

const SingUpPage: NextPage = () => {
  return (
    <SignLayout title={"login"}>
        <Typography variant={"h4"} py={2}>
          Crea una nueva cuenta
        </Typography>
        <Typography variant={"body1"} py={2}>
          ¿Ya eres miembro? Inicia sesión
        </Typography>
        <SignUpForm />
    </SignLayout>
  );
};

export default SingUpPage;
