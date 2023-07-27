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
      user_id: "dfyjgcghjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
    {
      user_id: "dfgxzxvhjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
    {
      user_id: "dfzxvcxvhjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
    {
      user_id: "dfghjkzxcxl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
    {
      user_id: "dfghjxzczxkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
    {
      user_id: "dfgsadahjkl",
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
  ];

  const [users, Setusers] = useState(userdata);

  return (
    <AppContext.Provider value={{ users }}>
      {props.children}
    </AppContext.Provider>
  );
}
