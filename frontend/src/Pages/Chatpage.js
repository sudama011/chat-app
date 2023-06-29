import React, { useEffect } from "react";
import axios from "axios";
const Chatpage = () => {
  const fetchChats = async () => {
    const data = await axios.get("/api/chat");
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chat</div>;
};

export default Chatpage;
