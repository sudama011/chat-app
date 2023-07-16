import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import { isThisUserLastMessage } from "../config/ChatLogics";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed >
      {messages?.map((m, i) => (
        <Box
          display="flex"
          justifyContent={m.sender._id === user._id ? "flex-end" : "flex-start"}
          key={m._id}
          
        >
          {isThisUserLastMessage(messages, i) && m.sender._id !== user._id && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr="1"
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
              />
            </Tooltip>
          )}

          <Box
            backgroundColor={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
            borderRadius="20px"
            p={"5px 15px"}
            maxW="75%"
            ml={
              isThisUserLastMessage(messages, i) && m.sender._id !== user._id
                ? "0"
                : "33"
            }
            position="relative"
            right="0"
            mt="1"
          >
            {m.content}
          </Box>
        </Box>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
