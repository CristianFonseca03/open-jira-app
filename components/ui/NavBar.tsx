import { useContext } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link,
  Box,
} from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui/UIContext";
import NextLink from "next/link";
import { signOut } from "next-auth/react";

import { ExitToApp } from "@mui/icons-material";

export const NavBar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h6">SecureDocs</Typography>
          </Link>
        </NextLink>
        <Box flexGrow={1} />
        <Typography
          onClick={() => signOut()}
          variant="h6"
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ExitToApp />
          Salir
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
