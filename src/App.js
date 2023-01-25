import { useEffect, useState } from "react";
import "./App.css";
import ChatButton from "./components/chat-button/chat-button";
import SlotText from "./components/slot-text/slot-text";

function App() {

  useEffect(() => {    
    setTimeout(() => {
      let arrow = document.getElementById("arrow-doodle");
      arrow.style.opacity = 1;
      arrow.style.animation = "arrow-bounce 1s ease-in-out infinite";
    }, 3000);
  }, []); 

  return (
    <div className="App">
      <div className="title-box">
        <span className="title-text">Welcome</span>
        <span className="title-text">To</span>
        <SlotText />
      </div>
      <img alt="Arrow Doodle" src="/arrow-doodle.png" className="arrow-doodle" id="arrow-doodle" />
      <div className="chat-bar">
        <div className="chat-button-div">
          <ChatButton key="0" name="DevBot" myKey="0" />
        </div>
        <div className="chat-button-div">
          <ChatButton key="1" name="BizBot" myKey="1" />
        </div>
        <div className="chat-button-div">
          <ChatButton key="2" name="DesignBot" myKey="2" />
        </div>
      </div>
    </div>
  );
}

export default App;
