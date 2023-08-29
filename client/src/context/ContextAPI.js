import React, { createContext, useState,useEffect } from "react";
import Cookies from "js-cookie";

// Create a new context
export const AppContext = createContext();

export default function ContextAPI(props) {

  const [users, Setusers] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  // State to track which user's chat to show
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserInfo,setSelectedUserInfo]= useState("");

  // Authorization
  const [loginData,setLoginData] = useState({});
  const [registerData,setRegisterData] = useState({"profile_photo":null});

  // Adding Users to conversations
  const [AddUserModalOpen,SetAddUserModalOpen] = useState(false);
  const [AddUser,SetAddUser] = useState("");

  // Fetch Users in User-list
  const fetchUsers=async ()=>{
    try{
      const response=await fetch("http://localhost:5001/user/listusers",{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${Cookies.get("Token")}`,
        },
      });

      const data=await response.json();
      Setusers(data.participantsList);
    }
    catch(err){
      // console.log(err);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  return (
    <AppContext.Provider
      value={{
        users,
        Setusers,
        searchUser,
        setSearchUser,
        selectedUser,
        setSelectedUser,
        loginData,
        setLoginData,
        registerData,
        setRegisterData,
        AddUserModalOpen,
        SetAddUserModalOpen,
        AddUser,
        SetAddUser,
        fetchUsers,
        selectedUserInfo,
        setSelectedUserInfo
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
