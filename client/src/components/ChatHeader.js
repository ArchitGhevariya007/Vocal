import React, { useContext,useEffect } from "react";
import { Box, Avatar } from "@mui/material";
import { Search } from "lucide-react";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatHeader({socket}) {

    //************* Using Context *************
    const Users = useContext(AppContext);

    //Getting typing response from server
    useEffect(()=>{
    let currentSocket = socket.current;

        socket.current?.on("typing_msg_send",(data)=>{
            if(data.from === Users.selectedUser){
                Users.SetTyping(data.message);
            }
        });

        socket.current?.on("stop_typing_send", (data) => {
        if (data.from === Users.selectedUser) {
            Users.SetTyping("");
        }
        });

        return () => {
            if (currentSocket) {
                currentSocket.off("typing_msg_send");
                currentSocket.off("stop_typing_send");
            }
        };
    })

return (
    <>
        <Box className="ChatHeader">
            <Avatar src={`${Users.selectedUserInfo.photo}`} alt="" />

            <div className="name_msg">
            <p className="UserNameTitle">
                {Users.selectedUserInfo.name}
            </p>
            <p className="TypingMsg">{Users?.Typing}</p>
            </div>
            <Search size="25" className="SearchIcon" />
        </Box>
        </>
    );
}
