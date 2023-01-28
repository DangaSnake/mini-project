import "./chat-button.css";
import { useEffect, useState } from "react";
import _ from "lodash";

/*Keywords for various bots, based on the "myKey" prop, lined up with the index of the array of reponses for said bot */
const acceptableKeywords = [
  ["help", "hello", "bootcamp", "tutorials", "courses", "keywords"],
  ["help", "hello", "business plan", "marketing", "courses", "keywords"],
  ["help", "hello", "design", "UI", "resources", "courses", "keywords"],
];

/* Corresponding welcoming messages for each bot by "myKey" */
const botWelcomeTexts = [
  "Hello, I'm DevBot! I can assist you finding resources for your web development journey. Try keywords like help, bootcamp, tutorials for more information!",
  "Hey there! My name is BizBot! I am here to guide and support you on your small business journey. Try keywords like help, business plan, and marketing for more information!",
  "Hello, I am DesignBot! I am here to assist you on your web and UI design journey. Try keywords like design, UI, help, and resources for more information.",
];

const ChatButton = (props) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userSentMessage, setUserSentMessage] = useState("");
  const [messageSendTimeout, setMessageSendTimeout] = useState(0);
  const [messageArray, setMessageArray] = useState([
    {
      sender: "bot",
      text: botWelcomeTexts[props.myKey],
    },
  ]);

  useEffect(() => {
    let chatBox =
      document.getElementsByClassName("chatbot-box")[parseInt(props.myKey)];
    const botResponseArray = chatBox.querySelectorAll(".bot-message-text");
    const botResponse = botResponseArray[botResponseArray.length - 1];
    const messageList = chatBox.querySelector(".message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
    if (botResponse) {
      acceptableKeywords[props.myKey].forEach((word) => {
        botResponse.innerHTML = botResponse.innerHTML.replace(
          new RegExp(`${word}`, "g"),
          `<span class="highlighted">${word}</span>`
        );
      });
    }
  }, [messageArray, chatOpen]);

  const handleClick = (event) => {
    let chatBox =
      document.getElementsByClassName("chatbot-box")[parseInt(props.myKey)];
    let onlineDot = chatBox.querySelector("#online-dot");
    let dotRipple =
      document.getElementsByClassName("dot-ripple")[parseInt(props.myKey)];
    /*Here we are closing the box when we click the label, soon we will add a box/X to close it */
    if (chatOpen && event.target.id === `chat-label-${props.myKey}`) {
      /*Chat closing*/
      setChatOpen(false);
      chatBox.classList.remove("chatbox-grow-animation");
      chatBox.classList.add("chatbox-ungrow-animation");
      onlineDot.style.opacity = 1;
      setTimeout(() => {
        chatBox.style.height = "40px";
        chatBox.style.width = "120px";
      }, 100);

      setTimeout(() => {
        dotRipple.style.visibility = "unset";
        dotRipple.style.animationName = "ripple";
      }, 2700);
    } else {
      /*Chat opening*/
      setChatOpen(true);
      let arrow = document.getElementById("arrow-doodle");
      arrow.style.opacity = 0;
      chatBox.classList.remove("chatbox-ungrow-animation");
      chatBox.classList.add("chatbox-grow-animation");
      onlineDot.style.opacity = 0;
      dotRipple.style.visibility = "hidden";
      dotRipple.style.animationName = "none";
      setTimeout(() => {
        chatBox.style.height = "400px";
        chatBox.style.width = "250px";
      }, 100);
    }
  };

  const handleMessageSend = (event) => {
    let chatBox =
      document.getElementsByClassName("chatbot-box")[parseInt(props.myKey)];
    let warningBox = chatBox.querySelector(".warning-message");
    console.log("handling message send");
    event.preventDefault();
    /*Exits the methods if there is no input value */
    if (!inputValue) {
      return false;
    }

    /*Starts by checking that the messSendTimeout is not active. */
    if (messageSendTimeout == 0) {
      setUserSentMessage(inputValue);
      setMessageArray([
        ...messageArray,
        {
          sender: "user",
          text: inputValue,
        },
      ]);
      setInputValue("");
      handleBotResponse(inputValue);
      /*Sets messageSendTimeout to be true */
      setMessageSendTimeout(1);
      /*Resets of timeout handled in bot response, when bot message displayed timeout is false
            Preventing the user from sending multiple messages when the bot is thinking*/
    } else {
      /*If messageSend IS timedout we display this warning element for a couple seconds an hide it wiht the timeout again */
      warningBox.style.opacity = 1;
      setTimeout(() => {
        warningBox.style.opacity = 0;
      }, 1500);
    }
  };

  /*Called by handleMessageSend and passed whatever the user types in, checks input for keywords, displays response by adding to state messageList*/
  const handleBotResponse = (userInput) => {
    let keywordMatch = "";
    let botText = "";

    /*Handles checking what keywords the user inputs, first match depends on the occurance in the keyword array */
    userInput = userInput.toLowerCase();
    acceptableKeywords[props.myKey].find((word) => {
      let regex = new RegExp(`${word}`, "gi");
      if (regex.test(userInput)) {
        keywordMatch = word;
        return true;
      }
    });

    /*RESPONSES, seperated by key and bot type*/
    if (props.myKey == "0") {
      /*Keywords for DEVBOT */
      switch (keywordMatch) {
        case "help":
          botText =
            "I'm here to help you on your web dev journey! Try typing tutorials - courses - bootcamp and use keywords for more options!";
          break;
        case "hello":
          botText = "Greetings I'm DevBot, how can I help you today?";
          break;
        case "bootcamp":
          botText =
            "Here are some popular bootcamp options to consider: Fullstack Academy, Hack Reactor, General Assembly and freeCodeCamp. Or try searching for bootcamps in your area!";
          break;
        case "keywords":
          botText =
            "Here are some of the available keywords: help - tutorials - courses - bootcamp";
          break;
        case "tutorials":
          botText =
            "Check out these tutorial resources: freeCodeCamp, Codecademy, Coursera and edX. These offer a range of tutorials for different skill levels and languages.";
          break;
        case "courses":
          botText =
            "Here are some options for online courses: Udemy, Pluralsight, Treehouse, LinkedIn Learning. Each platform has its own unique set of courses, take a look and find the one that best suits your needs.";
          break;
        default:
          botText =
            "Hmmm I'm sorry, I don't have a response for that. Try typing keywords for a list of available options.";
      }
    } else if (props.myKey == "1") {
      /*Keywords for BIZBOT */
      switch (keywordMatch) {
        case "help":
          botText =
            "I'm here to help you on your small biz journey! Use keywords like courses - business plan - help and use keywords for more options!";
          break;
        case "hello":
          botText = "Hello! I'm BizBot, how can I help you today?";
          break;
        case "keywords":
          botText =
            "Here are the keywords you can use: help - hello - business plan - marketing - courses";
          break;
        case "business plan":
          botText =
            "Creating a business plan can seem like a daunting task, but it's a crucial step in starting or growing your business. There are many resources available to help you create a business plan, such as SCORE and the Small Business Administration";
          break;
        case "marketing":
          botText =
            "Marketing is a crucial aspect of any business. Some popular strategies include social media marketing, content marketing, email marketing, and influencer marketing. Try researching these options to see which ones would work best for your business.";
          break;
        case "courses":
          botText =
            "There are many online courses available for small business owners. Some popular options include Coursera's Small Business Management course, Udemy's Entrepreneurship course, and the Small Business Management program on edX. Each of these courses offers a range of information!";
          break;
        default:
          botText =
            "Not sure what you mean, try typing keywords for a list of available options.";
      }
    } else {
      switch (keywordMatch) {
        /*Keywords for DesignBot */
        case "help":
          botText =
            "I can help you with all things design and UI! Try typing UI - design - bootcamp and use keywords for more options!";
          break;
        case "hello":
          botText =
            "What's up I'm DesignBot, is there something I can help you with today?";
          break;
        case "keywords":
          botText =
            "Here are the keywords you can use: help - hello - UI - design - courses - resources";
          break;
        case "design":
          botText =
            "Design is a crucial aspect of any website or application. Some popular design principles include usability, user-centered design, and responsive design. Try researching these principles to see how they can improve your project.";
          break;
        case "UI":
          botText =
            "UI design, or user interface design, is the process of designing the look and feel of a website or application. Some popular tools for UI design include Sketch, Adobe XD, and Figma. Try researching these tools to see which one would work best for your project.";
          break;
        case "resources":
          botText =
            "There are many resources available for web and UI design. Some popular options include Behance, Dribbble, and A List Apart. Each of these websites offers a variety of design inspiration and tutorials.";
          break;
        case "courses":
          botText =
            "There are many online courses available for web and UI design. Some popular options include Coursera's UI Design course, Udemy's Web Design course, and the Design Thinking program on edX. Each of these courses offers a range of information, such as design principles, prototyping and user research.";
          break;
        default:
          botText =
            "I'm not familiar with that, try typing keywords for a list of available options.";
      }
    }

    /*creates our loading animation in a message, as when the JSX receives a false "Text" it renders the loading*/
    setMessageArray((prevMessageArray) => {
      return [
        ...prevMessageArray,
        {
          sender: "bot",
          text: false,
        },
      ];
    });

    /*for displaying the response*/
    let messageDelay = Math.floor(Math.random() * (3000 - 1500 + 1) + 1500);
    let newArray = [];
    setTimeout(() => {
      setMessageArray((prevMessageArray) => {
        newArray = prevMessageArray.slice(0, -1);
        return prevMessageArray.slice(0, -1);
      });
    }, messageDelay);

    setTimeout(() => {
      setMessageArray([
        ...newArray,
        {
          sender: "bot",
          text: `${botText}`,
        },
      ]);
      setMessageSendTimeout(0);
    }, messageDelay + 50);
  };

  /*updating our "inputValue" state variable with whatever is typed in the input */
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      onClick={handleClick}
      id={`chatbot-box-${props.myKey}`}
      className="chatbot-box"
    >
      <label className="chatbot-label" id={`chat-label-${props.myKey}`}>
        <div className="online-dot" id="online-dot" />
        <div className="online-dot dot-ripple" id="dot-ripple" />
        <span>{`${props.name}`}</span>
      </label>
      {chatOpen && (
        <div className="inner-chatbox">
          <div className="message-list" id="message-list">
            {messageArray.map((message, idx) => {
              /* Returns our loading animation if "text" prop set to false */
              if (!message.text) {
                return (
                  <div key={idx} className="bot-message">
                    <img
                      src={`/bot-icon-${props.myKey}.png`}
                      alt="bot-pfp-icon"
                      className="message-image"
                    ></img>
                    <span
                      className={`message-text bot-message-text bot-${props.myKey}-message`}
                    >
                      <div className="load-animation-holder">
                        <div className="load-dot load-dot-1" />
                        <div className="load-dot load-dot-2" />
                        <div className="load-dot load-dot-3" />
                      </div>
                    </span>
                  </div>
                );
              } else if (message.sender === "bot") {
                /* otherwise checks the ".sender" prop and renders each element based on that */
                return (
                  <div key={idx} className="bot-message">
                    <img
                      src={`/bot-icon-${props.myKey}.png`}
                      alt="bot-pfp-icon"
                      className="message-image"
                    ></img>
                    <span
                      className={`message-text bot-message-text bot-${props.myKey}-message`}
                    >
                      {message.text}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="user-message">
                    <img
                      src="/user-icon.png"
                      alt="bot-pfp-icon"
                      className="message-image"
                    ></img>
                    <span className="message-text user-message-text">
                      {message.text}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div className="warning-message">
            <span className="warning-text">
              Sending messages too fast! Slow down
            </span>
          </div>
          <form className="input-bar" onSubmit={handleMessageSend}>
            <input
              className="input-element"
              onChange={handleChange}
              value={inputValue}
              type="text"
              placeholder="Enter your text here..."
            ></input>
            <button type="submit" className="arrow-button">
              <img
                src="/arrow-icon.png"
                alt="send-arrow-icon"
                className="arrow-icon"
              />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
