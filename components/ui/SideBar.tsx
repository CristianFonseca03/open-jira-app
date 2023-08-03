import { FC, useContext } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { UIContext } from "../../context/ui";
import { Book, Person } from "@mui/icons-material";

interface Props {
  showUserButton: boolean;
}

export const SideBar: FC<Props> = ({ showUserButton }) => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {showUserButton && (
            <ListItemButton href="/users">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          )}
          <ListItemButton href="/">
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary={"Documentos"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
