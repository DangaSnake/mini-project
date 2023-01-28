import { useEffect, useState } from "react";
import classNames from "classnames";

import ChatButton from "./components/chat-button/chat-button";
import SlotText from "./components/slot-text/SlotText.tsx";

import "./App.scss";

function App() {
  const [animateArrow, setAnimateArrow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateArrow(true);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <div className="title-box">
        <span className="title-text">Welcome</span>
        <span className="title-text">To</span>
        <SlotText />
      </div>
      <img
        alt="Arrow Doodle"
        src="/mini-project/arrow-doodle.png"
        className={classNames("arrow-doodle", animateArrow && "animating")}
        id="arrow-doodle"
      />
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
