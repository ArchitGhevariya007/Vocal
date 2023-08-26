import React, { createContext, useState,useEffect } from "react";
import Cookies from "js-cookie";

// Create a new context
export const AppContext = createContext();

export default function ContextAPI(props) {
  //Temp data
  // const userdata = [
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghfsdjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Shubham Khunt",
  //     lastmsg: "How are you?",
  //     recenttime: "12:35 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  //   {
  //     user_id: "dfghzccbcjkl",
  //     profile: require("../assets/imgs/profile.jpg"),
  //     name: "Archit Ghevariya",
  //     lastmsg: "Hello..!",
  //     recenttime: "10:25 PM",
  //   },
  // ];


  const [users, Setusers] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  // State to track which user's chat to show
  const [selectedUser, setSelectedUser] = useState(null);

  const [loginData,setLoginData] = useState({});
  const [registerData,setRegisterData] = useState({"profile_photo":null});
  const [isAuthUser,SetisAuthUser] = useState(null);
  const [AddUserModalOpen,SetAddUserModalOpen] = useState(false);
  const [AddUser,SetAddUser] = useState("");

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
      console.log(err);
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
        isAuthUser,
        SetisAuthUser,
        AddUserModalOpen,
        SetAddUserModalOpen,
        AddUser,
        SetAddUser,
        fetchUsers
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
