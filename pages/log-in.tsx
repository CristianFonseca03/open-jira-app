import { NextPage } from "next";
import { SignLayout } from "../components/layouts";
import { Box, Typography } from "@mui/material";
import { LogInForm } from "../components/ui/";

const SignInPage: NextPage = () => {
  return (
    <SignLayout title={"login"}>
      {/* <Layout title={'login'} withMenu={false}> */}
      <Typography variant={"h4"} py={2}>
        Inicia sesión en Secure Docs
      </Typography>
      <LogInForm />
    </SignLayout>
  );
};

export default SignInPage;
