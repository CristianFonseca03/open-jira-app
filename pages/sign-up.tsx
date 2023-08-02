import { NextPage } from "next";
import { SignLayout } from "../components/layouts";
import { Box, Typography } from "@mui/material";
import { SignUpForm } from "../components/ui/";

const SingUpPage: NextPage = () => {
  return (
    <SignLayout title={"login"}>
      <SignUpForm />
    </SignLayout>
  );
};

export default SingUpPage;
