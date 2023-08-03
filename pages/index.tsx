// @ts-ignore

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { Card, CardHeader, Grid, Skeleton } from "@mui/material";

import { Layout } from "../components/layouts";
import { NewEntry, EntryList } from "../components/ui";
import AccessDenied from "../components/ui/AccessDenied";

const HomePage: NextPage = () => {
  const { data: session, status } = useSession();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const tokenResponse = await fetch(
        `${process.env.BACKEND_URL}auth/validate-jwt`,
        {
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            "x-token": (session?.token as string) || "",
          },
        }
      );
      const dataToken = await tokenResponse.json();
      if (dataToken.success) {
        setIsValidToken(true);
      }
    };
    verifyToken();
  }, [session]);

  if (status === "loading") {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!session && !isValidToken) {
    return <AccessDenied />;
  }

  return (
    <Layout title="SecureDocs">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryList status={"pending"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
            <EntryList status={"in-progress"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <EntryList status={"finished"} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
