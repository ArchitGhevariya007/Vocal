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
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },{
      user_id: "dfghzccbcjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
  ];

  const [users, Setusers] = useState(userdata);

  const [searchUser, setSearchUser] = useState("");

  return (
    <AppContext.Provider value={{ users,Setusers,searchUser,setSearchUser }}>
      {props.children}
    </AppContext.Provider>
  );
}
