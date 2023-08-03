// @ts-ignore

import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";

import { Layout } from "../components/layouts";
import { NewEntry, EntryList } from "../components/ui";
import AccessDenied from "../components/ui/AccessDenied";
import {
  Delete,
  Edit,
  FileCopy,
  FileCopyOutlined,
  InsertDriveFile,
  Person,
} from "@mui/icons-material";

interface Document {
  _id: string;
  tittle: string;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EditDocumentForm {
  tittle: string;
  description: string;
}

const HomePage: NextPage = () => {
  const { data: session, status } = useSession();
  const [isValidToken, setIsValidToken] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isOpenEditDocument, setIsOpenEditDocument] = useState(false);
  const [form, setForm] = useState<EditDocumentForm>({
    tittle: "",
    description: "",
  });

  const handlerForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const verifyToken = async () => {
      const tokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/validate-jwt`,
        {
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            "x-token": (session?.token as string) || "",
          },
        }
      );
      console.log({ tokenResponse } + "tokenResponse");
      const dataToken = await tokenResponse.json();
      console.log({ dataToken } + "dataToken");
      if (dataToken.success) {
        setIsValidToken(true);
      }
    };
    verifyToken();
    getDocuments();
  }, [session]);

  if (status === "loading") {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!session && !isValidToken) {
    return <AccessDenied />;
  }

  async function getDocuments() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}documents/`,
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "x-token": (session?.token as string) || "",
        },
        method: "GET",
      }
    );
    const data = await res.json();
    setDocuments(data.data);
  }

  async function editDocument(id: string) {
    setIsOpenEditDocument(false);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}documents/`,
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "x-token": (session?.token as string) || "",
        },
        method: "PUT",
        body: JSON.stringify({
          tittle: form.tittle,
          description: form.description,
          id,
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      getDocuments();
    }
  }

  const handleEditModal = () => {
    setIsOpenEditDocument(false);
  };

  function editModalComponent(id: string) {
    return (
      <Box>
        <Box my={2}>
          <TextField
            autoComplete={"off"}
            type={"text"}
            placeholder={"Titulo"}
            fullWidth
            name={"tittle"}
            onChange={handlerForm}
          />
        </Box>
        <Box my={2}>
          <TextField
            autoComplete={"off"}
            type={"text"}
            placeholder={"Descripción"}
            fullWidth
            name={"description"}
            onChange={handlerForm}
          />
        </Box>
        <Box my={2}>
          <Button onClick={() => editDocument(id)}>Guardar</Button>
        </Box>
      </Box>
    );
  }

  if (documents.length === 0) {
    return (
      <Layout showUserButton={session?.user?.name == "admin"}>
        <List>
          <Box>
            <ListItem>
              <ListItemText>No hay documentos</ListItemText>
            </ListItem>
            <Divider />
          </Box>
        </List>
      </Layout>
    );
  }

  return (
    <Layout showUserButton={session?.user?.name == "admin"}>
      <List>
        {documents.map((document) => (
          <Box key={document._id}>
            <ListItem
              secondaryAction={
                <Box>
                  <Dialog open={isOpenEditDocument} onClose={handleEditModal}>
                    <DialogTitle>Editar Documento</DialogTitle>
                    <DialogContent>
                      {editModalComponent(document._id)}
                    </DialogContent>
                  </Dialog>
                  {(session?.user?.name == "admin" ||
                    session?.user?.name == "editor") && (
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setIsOpenEditDocument(true)}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    startIcon={<FileCopy />}
                    onClick={() => {
                      window.open(document.link, "_blank");
                    }}
                  >
                    Link
                  </Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFile />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{document.tittle}</ListItemText>
              <ListItemText>{document.description}</ListItemText>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Layout>
  );
};

export default HomePage;
