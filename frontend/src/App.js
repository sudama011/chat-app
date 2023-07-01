import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route exact path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
