import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import axios from "axios";

// axios.defaults.baseURL = "https://chat-app-api-1.vercel.app";
// axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.baseURL = "https://chat-app-api-ezua.onrender.com/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
