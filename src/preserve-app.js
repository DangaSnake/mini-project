import { useEffect, useState } from "react";
import "./App.css";
import ChatButton from "./components/chat-button/chat-button";

function App() {

  const [chatButtonPositions, setChatButtonPositions] = useState([2, 18, 34]);
  const [chatButtonOpen, setChatButtonOpen] = useState([false, false, false]);


  useEffect(() => {
    setTimeout(() => {
      let arrow = document.getElementById("arrow-doodle");
      arrow.style.opacity = 1;
      arrow.style.animation = "arrow-bounce 1s ease-in-out infinite";
    }, 3800);
  }, []);

  const handleButtonOpenUpdate = (action, key) => {
    if (action === "open") {
      setChatButtonOpen((prevChatButtonOpen) => {
        let updatedArray = prevChatButtonOpen;
        updatedArray[key] = true;
        return (updatedArray);
      })
    }
  };

  const handleChatBoxMovement = (action, key) => {
    console.log("Handle chat box movement called");
    let defaultValue = [2, 18, 34];
    let newValue = [...defaultValue]


    /*We get a string passed from the function call that determines if we are closing or opening, if closing we reset all positions to default */
  
      if (action === "close") {
        handleButtonOpenUpdate(action, key);
        if (chatButtonOpen[0] && !chatButtonOpen[1]) {
          setChatButtonPositions([2, 18, 34]);
        } else if (chatButtonOpen && chatButtonOpen[1]) {
          setChatButtonPositions([2, 34, 50]);
        }
      } else {
        if (!chatButtonOpen[0] && !chatButtonOpen[1]) {
          switch (key) {
            case "0":
              /*This case is when the first box is clicked we move the second and third */
            setChatButtonPositions([2, defaultValue[1] + 16, defaultValue[2] + 16]);
              break;
            case "1":
              /*This is when the second is clicked and we only move the third box over */
              setChatButtonPositions([2, 18, defaultValue[2] + 16]);
              break;
          } 
        } else if (chatButtonOpen[0] || chatButtonOpen[1]) {
          switch (key) {
            case "0": 
            setChatButtonPositions([2, defaultValue[1] + 16, defaultValue[2] + 32]);
            case "1": 
            setChatButtonPositions([2, defaultValue[1] + 16, defaultValue[2] + 32]);
          }
        }
        

      }
      handleButtonOpenUpdate(action, key);
     
  };

  return (
    <div className="App">
      <div className="title-box">
        <span className="title-text">Welcome</span>
        <span className="title-text">To</span>
        <span className="title-text">DevBot.</span>
      </div>
      <img alt="Arrow Doodle" src="/arrow-doodle.png" className="arrow-doodle" id="arrow-doodle" />
      <div className="chat-bar">
        <ChatButton key="0" position={`${chatButtonPositions[0]}%`} handleButtonMovement={handleChatBoxMovement} name="DevBot" myKey="0" />
        <ChatButton key="1" position={`${chatButtonPositions[1]}%`} handleButtonMovement={handleChatBoxMovement} name="TestBot" myKey="1" />
        <ChatButton key="2" position={`${chatButtonPositions[2]}%`} handleButtonMovement={handleChatBoxMovement} name="TestBot2" myKey="2" />
      </div>
    </div>
  );
}

export default App;
