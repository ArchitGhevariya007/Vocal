import React, { useContext, useEffect } from "react";
import { Box, Avatar } from "@mui/material";
import { Search } from "lucide-react";
import { AppContext } from "../context/ContextAPI";
import Cookies from "js-cookie";

import "../style/style.css";

export default function ChatHeader() {
  //************* Using Context *************
    const Users = useContext(AppContext);

    const FetchSelectedUserInfo = async (participantId) => {
        try {
        const response = await fetch(
            "http://localhost:5001/user/fetchselecteduser",
            {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("Token")}`,
            },
            body: JSON.stringify({ participantId }),
            }
        );

        const data = await response.json();
        Users.setSelectedUserInfo(data);
        } catch (err) {
        console.log(err);
        }
    };
    console.log(Users.selectedUserInfo.userInfo);
    useEffect(() => {
        FetchSelectedUserInfo(Users.selectedUser);
        // eslint-disable-next-line
    }, [Users.selectedUser]);


    return (
        <>
            <Box className="ChatHeader">
            <Avatar src={`${Users.selectedUserInfo.userInfo.photo}`} alt="" />

            <div className="name_msg">
                <p className="UserNameTitle">
                {Users.selectedUserInfo.userInfo.name}
                </p>
                <p className="TypingMsg">Archit Typing...</p>
            </div>
            <Search size="25" className="SearchIcon" />
            </Box>

        </>
    );
}
