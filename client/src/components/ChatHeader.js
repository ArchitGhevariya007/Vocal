import React,{useContext,useEffect} from "react";
import { Box } from "@mui/material";
import { Search } from "lucide-react";
import { AppContext } from "../context/ContextAPI";
import Cookies from "js-cookie";


import "../style/style.css";

export default function ChatHeader() {
    //************* Using Context *************
    const Users = useContext(AppContext);

    const FetchSelectedUserInfo=async ()=>{
        try{
            const response = await fetch("http://localhost:5001/user/fetchselecteduser",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${Cookies.get("Token")}`,
                },
                body: JSON.stringify({participantId:Users.selectedUser}),
            })

            const data=await response.json();
            Users.setSelectedUserInfo(data);
        }catch(err){
            console.log(err);
        }
    }
    // console.log(Users.selectedUser);
    useEffect(()=>{
        console.log(Users.selectedUserInfo)
        FetchSelectedUserInfo();
    },[Users.selectedUserInfo])

    

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
