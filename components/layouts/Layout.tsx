import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { NavBar } from "../ui";

interface Props {
  children: JSX.Element;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title = "OpenJira" }) => {
  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <Head>
          <title>{title}</title>
        </Head>
        <NavBar />
        {/* SideBar */}
        <Box sx={{ padding: "10px 20px" }}>{children}</Box>
      </Box>
    </>
  );
};
