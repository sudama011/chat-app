import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "../components/ScrollableChat";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import "./miscellaneous/styles.css";
import { io } from "socket.io-client";
import { set } from "mongoose";

const ENTPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();
  useEffect(() => {
    socket = io(ENTPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to load messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (err) {
        toast({
          title: "Error Occured!",
          description: "Failed to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return selectedChat ? (
    <>
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        <IconButton
          d={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => setSelectedChat("")}
        />
        {!selectedChat.isGroupChat ? (
          <>
            {getSender(user, selectedChat.users)}
            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
          </>
        ) : (
          <>
            {selectedChat.chatName.toUpperCase()}

            <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              fetchMessages={fetchMessages}
            />
          </>
        )}
      </Text>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <span className="messages">
            <ScrollableChat messages={messages} />
          </span>
        )}
        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
          <Input
            variant="filled"
            bg="#e0e0e0"
            placeholder="enter message!"
            value={newMessage}
            onChange={typingHandler}
          />
        </FormControl>
      </Box>
    </>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" h="100%">
      <Text fontSize="3xl" pb={3} fontFamily="Work sans">
        Click on user to start chating
      </Text>
    </Box>
  );
};

export default SingleChat;
