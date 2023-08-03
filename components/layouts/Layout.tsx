import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { NavBar, SideBar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
  showUserButton?: boolean;
}

export const Layout: FC<Props> = ({
  children,
  title = "SecureDocs",
  showUserButton = false,
}) => {
  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <Head>
          <title>{title}</title>
        </Head>
        <NavBar />
        <SideBar showUserButton={showUserButton} />
        <Box sx={{ padding: "10px 20px" }}>{children}</Box>
      </Box>
    </>
  );
};
