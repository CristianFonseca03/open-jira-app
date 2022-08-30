import { List, Paper } from "@mui/material";
import React from "react";
import { EntryCard } from "./EntryCard";

export const EntryList = () => {
  return (
    /* Acá se hará el drop */
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* cambiará dependiendo si estoy haciendo drag o no */}
        <List sx={{ opacity: 1 }}>
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
        </List>
      </Paper>
    </div>
  );
};
