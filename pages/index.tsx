import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title="Principal Page">
      <Typography variant="h1" color="primary">
        Hola mundo
      </Typography>
    </Layout>
  );
};

export default HomePage;
