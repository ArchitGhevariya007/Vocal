import React, { useContext } from "react";
import { Box, Avatar } from "@mui/material";
import { Search } from "lucide-react";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatHeader() {

    //************* Using Context *************
    const Users = useContext(AppContext);

return (
    <>
        <Box className="ChatHeader">
            <Avatar src={`${Users.selectedUserInfo.photo}`} alt="" />

            <div className="name_msg">
            <p className="UserNameTitle">
                {Users.selectedUserInfo.name}
            </p>
            <p className="TypingMsg">Archit Typing...</p>
            </div>
            <Search size="25" className="SearchIcon" />
        </Box>
        </>
    );
}
