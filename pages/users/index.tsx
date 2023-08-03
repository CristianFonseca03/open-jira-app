// @ts-ignore

import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { emailRegExp as isValidEmail } from "../../utils";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import AccessDenied from "../../components/ui/AccessDenied";
import { Layout } from "../../components/layouts";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Skeleton,
  TextField,
} from "@mui/material";
import { Delete, Edit, Person } from "@mui/icons-material";

interface User {
  email: string;
  name: string;
  lastName: string;
  role: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface EditUserForm {
  firstName: string;
  lastName: string;
  role: string;
}

const Users: NextPage = () => {
  const { data: session, status } = useSession();
  const [isValidToken, setIsValidToken] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const [form, setForm] = useState<EditUserForm>({
    firstName: "",
    lastName: "",
    role: "",
  });
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    getUsers();
  }, [session]);

  async function getUsers() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/get-users`,
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
    let users: User[] = data.users;
    if (session?.user?.email) {
      users = users.filter((user) => user.email != session?.user?.email);
    }
    setUsers(users);
  }

  if (status === "loading") {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!session && !isValidToken) {
    return <AccessDenied />;
  }

  function getRoleComponent(role: string) {
    switch (role) {
      case "admin":
        return (
          <ListItemText style={{ color: "yellow" }}>Administrador</ListItemText>
        );
      case "editor":
        return <ListItemText style={{ color: "blue" }}>Editor</ListItemText>;
      case "user":
        return <ListItemText style={{ color: "green" }}>Usuario</ListItemText>;
      default:
        return <ListItemText style={{ color: "red" }}>??</ListItemText>;
    }
  }

  function gerStatusComponentText(status: boolean) {
    if (status) {
      return <ListItemText style={{ color: "blue" }}>Activo</ListItemText>;
    } else {
      return <ListItemText style={{ color: "red" }}>Bloqueado</ListItemText>;
    }
  }

  async function updateLockUser(locked: boolean, email: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/update-user/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "x-token": (session?.token as string) || "",
        },
        body: JSON.stringify({
          email: email,
          status: locked,
          attempts: locked ? 0 : 3,
        }),
        method: "PUT",
      }
    );
    const data = await res.json();
    if (data.success) {
      getUsers();
    }
  }

  function gerStatusComponentButton(user: User) {
    if (!user.status) {
      return (
        <Button
          onClick={() => {
            updateLockUser(true, user.email);
          }}
        >
          Desbloquear
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            updateLockUser(false, user.email);
          }}
        >
          Bloquear
        </Button>
      );
    }
  }

  async function deleteUser(email: string) {
    console.log(email);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/delete-user/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "x-token": (session?.token as string) || "",
        },
        body: JSON.stringify({ email }),
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data.success) {
      getUsers();
    }
  }

  async function editUser() {
    setIsOpenEditUser(false);
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/update-user/${selectedEmail}`,
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "x-token": (session?.token as string) || "",
        },
        body: JSON.stringify({
          email: selectedEmail,
          name: form.firstName,
          lastName: form.lastName,
          role: selectedRole,
        }),
        method: "PUT",
      }
    );
    const data = await res.json();
    if (data.success) {
      getUsers();
    }
    setIsLoading(false);
  }

  function handleCloseEditModal() {
    setIsOpenEditUser(false);
  }

  function editModalComponent() {
    return (
      <Box>
        <Box my={2}>
          <TextField
            autoComplete={"off"}
            type={"text"}
            placeholder={"Nombre"}
            fullWidth
            name={"firstName"}
            onChange={handlerForm}
          />
        </Box>
        <Box my={2}>
          <TextField
            autoComplete={"off"}
            type={"text"}
            placeholder={"Apellido"}
            fullWidth
            name={"lastName"}
            onChange={handlerForm}
          />
        </Box>
        <Box my={2}>
          <ButtonGroup fullWidth>
            <Button
              color={selectedRole === "admin" ? "secondary" : "primary"}
              onClick={() => setSelectedRole("admin")}
            >
              Admin
            </Button>
            <Button
              color={selectedRole === "editor" ? "secondary" : "primary"}
              onClick={() => setSelectedRole("editor")}
            >
              Editor
            </Button>
            <Button
              color={selectedRole === "user" ? "secondary" : "primary"}
              onClick={() => setSelectedRole("user")}
            >
              Usuario
            </Button>
          </ButtonGroup>
        </Box>
        <Box my={2}>
          <Button onClick={() => editUser()}>Guardar</Button>
        </Box>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Layout showUserButton={true}>
        <List>
          <Box>
            <ListItem>
              <ListItemText>Cargando...</ListItemText>
            </ListItem>
            <Divider />
          </Box>
        </List>
      </Layout>
    );
  }

  if (users.length == 0) {
    return (
      <Layout showUserButton={true}>
        <List>
          <Box>
            <ListItem>
              <ListItemText>No hay usuarios</ListItemText>
            </ListItem>
            <Divider />
          </Box>
        </List>
      </Layout>
    );
  }

  return (
    <Layout showUserButton={true}>
      <List>
        {users.map((user) => (
          <Box key={user.email}>
            <ListItem
              secondaryAction={
                <Box>
                  {gerStatusComponentButton(user)}
                  <Dialog open={isOpenEditUser} onClose={handleCloseEditModal}>
                    <DialogTitle>Editar usuario</DialogTitle>
                    <DialogContent>{editModalComponent()}</DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => {
                      setSelectedEmail(user.email);
                      setIsOpenEditUser(true);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button onClick={() => deleteUser(user.email)}>
                    <Delete />
                  </Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                {user.name} {user.lastName}
              </ListItemText>
              <ListItemText>{user.email}</ListItemText>
              {getRoleComponent(user.role)}
              {gerStatusComponentText(user.status)}
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Layout>
  );
};

export default Users;
