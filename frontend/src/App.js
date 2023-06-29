import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
