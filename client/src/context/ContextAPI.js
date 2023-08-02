import React, { createContext, useState } from "react";

// Create a new context
export const AppContext = createContext();

export default function ContextAPI(props) {
  //Temp data
  const userdata = [
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghfsdjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Shubham Khunt",
      lastmsg: "How are you?",
      recenttime: "12:35 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
  ];

  const [users, Setusers] = useState(userdata);

  const [searchUser, setSearchUser] = useState("");

  // State to track which user's chat to show
  const [selectedUser, setSelectedUser] = useState(null);

  const [loginData,setLoginData] = useState({
    // email:"",
    // password:""  
  })

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
        setLoginData
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
