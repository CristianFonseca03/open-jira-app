import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { NavBar, SideBar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export const SignLayout: FC<Props> = ({ children, title = "SecureDocs" }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Ajusta la altura si es necesario para centrar verticalmente también
        }}
      >
        <Head>
          <title>{title}</title>
        </Head>
        <Box >{children}</Box>
      </Box>
    </>
  );
};
