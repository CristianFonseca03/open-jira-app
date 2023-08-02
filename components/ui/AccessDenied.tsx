import { Layout, SignLayout } from "../layouts";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <SignLayout title={"Acceso Restringido"}>
      <Box
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box>
          <Typography variant="h6">No tienes acceso a SecureDocs</Typography>
          <br />
          <Link href={"/log-in"} passHref>
            <Button
              variant={"contained"}
              style={{
                borderRadius: "50px",
                padding: "12px 0",
                width: "19rem",
              }}
            >
              Iniciar sesión
            </Button>
          </Link>
        </Box>
      </Box>
    </SignLayout>
  );
}
