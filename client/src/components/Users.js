import React from "react";
import { TextField, InputAdornment,Container } from "@mui/material";
import { Search } from "lucide-react";
import "../style/style.css";

export default function Users() {
  return (
    <>
    <Container className="UserList">
      <p className="Heading">Messages</p>
      <TextField
        placeholder="Search..."
        className="SearchBox"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size="16" />
            </InputAdornment>
          ),
        }}
      />
          <Container>
        {/* <img /> */}
        <p>Archit Ghevariya</p>
    </Container>
    </Container>

    </>
  );
}
