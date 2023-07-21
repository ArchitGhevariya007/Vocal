import React from "react";
import { Box } from "@mui/material";
import { Search } from "lucide-react";

import "../style/style.css";

export default function ChatHeader() {
return (
    <>
    <Box className="ChatHeader">
        <img
        className="profile-image"
        src={require("../assets/imgs/profile.jpg")}
        alt=""
        />
        <div className="name_msg">
        <p className="UserNameTitle">Archit Ghevariya</p>
        <p className="TypingMsg">Archit Typing...</p>
        </div>
        <Search size="25" className="SearchIcon"/>
    </Box>
    </>
);
}
