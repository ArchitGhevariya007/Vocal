import React, { createContext, useState,useEffect } from "react";
import Cookies from "js-cookie";

// Create a new context
export const AppContext = createContext();

export default function ContextAPI(props) {

  const [users, Setusers] = useState([]);
  const [currentUser,SetcurrentUser]=useState([]);

  const [searchUser, setSearchUser] = useState("");

  // State to track which user's chat to show
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserInfo,setSelectedUserInfo]= useState(null);

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
      SetcurrentUser(data.sender_id);
    }
    catch(err){
      // console.log(err);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  // Fetching Selected User
  const FetchSelectedUserInfo = async () => {
    try {
    const response = await fetch(
        "http://localhost:5001/user/fetchselecteduser",
        {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("Token")}`,
        },
        body: JSON.stringify({ selectedUser: selectedUser }),
        }
    );

    const data = await response.json();

    if (response.ok) {
        setSelectedUserInfo(data);
    }
    } catch (err) { 
        // console.log(err);
    }
};

  useEffect(() => {
    if (selectedUser) {
      FetchSelectedUserInfo();
    }
      // eslint-disable-next-line
  }, [selectedUser]);


  //Fetching chat messages
  const FetchSelectedUserChat = async () => {
    try {
    const response = await fetch(
        "http://localhost:5001/user/fetchchatdata",
        {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("Token")}`,
        },
        body: JSON.stringify({ roomId: selectedUserInfo.roomId }),
        }
    );
    const data = await response.json();

    if (response.ok) {
      setChatMessages([]);
      data.forEach((data)=>{
        const imageSrc = `https://drive.google.com/uc?export=view&id=${data.message}`;
        addMessage({sender:(data.sender===selectedUserInfo.id)?false:true,text: (data.contentType==="image")?imageSrc:data.message,time:data.time,contentType:data.contentType});
        console.log(data)
      })
    }
    } catch (err) { 
        // console.log(err);
    }
};

  useEffect(() => {
    if (selectedUserInfo) {
      FetchSelectedUserChat();
    }
      // eslint-disable-next-line
  }, [selectedUserInfo,selectedUser]);


  // Message sending
  const [message,SetMessage]=useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Function to add a new message to the chatMessages state
  const addMessage = (message) => {
    setChatMessages((prevMessages) =>[...prevMessages, message]);
  };

  //Typing notification states
  const [Typing,SetTyping]=useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  //Delete chat
  const [deleteMenu,setDeleteMenu]=useState(null);

  //Image Preview
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setSelectedUserInfo,
        FetchSelectedUserInfo,
        message,
        SetMessage,
        chatMessages,
        setChatMessages,
        addMessage,
        currentUser,
        SetcurrentUser,
        FetchSelectedUserChat,
        Typing,
        SetTyping,
        isTyping,
        setIsTyping,
        typingTimeout,
        setTypingTimeout,
        deleteMenu,
        setDeleteMenu,
        selectedImage,
        setSelectedImage,
        isModalOpen,
        setIsModalOpen
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
