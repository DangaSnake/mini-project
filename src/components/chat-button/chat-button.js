import "./chat-button.css";
import { useEffect, useState } from "react";

const acceptableKeywords = ["help", "hello", "bootcamp", "tutorials", "courses", "keywords"];

const ChatButton = (props) => {
    const [chatOpen, setChatOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [userSentMessage, setUserSentMessage] = useState("");
    const [messageArray, setMessageArray] = useState([
        {
            sender: "bot",
            text: "Hello, I'm DevBot! I can assist you finding resources for your web development journey. Try keywords like help - bootcamp - tutorials for more information!"
        },
    ]);

    useEffect(() => {
        const botResponseArray = document.getElementsByClassName("bot-message-text");
        const botResponse = botResponseArray[botResponseArray.length - 1];
        const messageList = document.getElementById("message-list");
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
        if (botResponse) {
            botResponse.textContent.split(" ").forEach((word) => {
                if (acceptableKeywords.includes(word)) {
                    botResponse.innerHTML = botResponse.innerHTML.replace(word, `<span class="highlighted">${word}</span>`);
                }
            })
        };
    }, [messageArray, chatOpen])

    const handleClick = (event) => {
        console.log("LOGGING PROPS KEY: ", props.myKey);
        let chatBox = document.getElementsByClassName("chatbot-box")[parseInt(props.myKey)];
        let onlineDot = document.getElementsByClassName("online-dot")[parseInt(props.myKey)];
        let dotRipple = document.getElementsByClassName("dot-ripple")[parseInt(props.myKey)];
        /*Here we are closing the box when we click the label, soon we will add a box/X to close it */
        if (chatOpen && event.target.id === `chat-label-${props.myKey}`) {
            props.handleButtonMovement("close", props.myKey);
            console.log("Attemping window close, from chat-label click!!")
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
            props.handleButtonMovement("open", props.myKey);
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
    }

    const handleMessageSend = (event) => {
        event.preventDefault();
        setUserSentMessage(inputValue);
        setMessageArray([...messageArray, {
            sender: "user",
            text: inputValue
        }]);
        setInputValue("");
        handleBotResponse(inputValue);
    }

    const handleBotResponse = (userInput) => {
        let keywordMatch = "";
        let botText = "";
        userInput = userInput.toLowerCase();
        userInput.split(" ").find((inputWord) => {
            if (acceptableKeywords.includes(inputWord)) {
                keywordMatch = inputWord;
                return true;
            }
            return false;
        })

        switch (keywordMatch) {
            case "help":
                botText = "I'm here to help you on your web dev journey! Try typing tutorials - courses - bootcamp and use keywords for more options!";
                break;

            case "hello":
                botText = "Greetings I'm DevBot, how can I help you today?";
                break;
            case "bootcamp":
                botText = "Here are some popular bootcamp options to consider: Fullstack Academy, Hack Reactor, General Assembly and freeCodeCamp. Or try searching for bootcamps in your area!";
                break;
            case "keywords":
                botText = "Here are some of the available keywords: help - tutorials - courses - bootcamp";
                break;
            case "tutorials":
                botText = "Check out these tutorial resources: freeCodeCamp, Codecademy, Coursera and edX. These offer a range of tutorials for different skill levels and languages.";
                break;
            case "courses":
                botText = "Here are some options for online courses: Udemy, Pluralsight, Treehouse, LinkedIn Learning. Each platform has its own unique set of courses, take a look and find the one that best suits your needs.";
                break;
            default:
                botText = "Hmmm I'm sorry, I don't have a response for that. Try typing keywords for a list of available options.";
        }

        setMessageArray((prevMessageArray) => {
            return ([...prevMessageArray, {
                sender: "bot",
                text: false
            }]);
        });

        setTimeout(() => {
            setMessageArray((prevMessageArray) => {
                let updatedMessageArray = prevMessageArray.slice(0, prevMessageArray.length - 1);
                return ([...updatedMessageArray, {
                    sender: "bot",
                    text: `${botText}`
                }]);
            });
        }, Math.floor(Math.random() * (3000 - 1500 + 1) + 1500));
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }


    return (
        <div onClick={handleClick} id="chatbot-box" className="chatbot-box" style={{right: `${props.position}`}}>
            <label className="chatbot-label" id={`chat-label-${props.myKey}`}>
                <div className="online-dot" id="online-dot"/>
                <div className="online-dot dot-ripple" id="dot-ripple"/>
                <span>{`${props.name}`}</span>
            </label>
            {chatOpen && <div className="inner-chatbox">
                <div className="message-list" id="message-list">
                    {messageArray.map((message, idx) => {
                        /* Returns our loading animation if "text" prop set to false */
                        if (!message.text) {
                            return (
                                <div key={idx} className="bot-message">
                                <img src="/bot-icon.png" alt="bot-pfp-icon" className="message-image"></img>
                                <span className="message-text bot-message-text">
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
                                    <img src="/bot-icon.png" alt="bot-pfp-icon" className="message-image"></img>
                                    <span className="message-text bot-message-text">{message.text}</span>
                                </div>)
                        } else {
                            return (
                                <div key={idx} className="user-message">
                                    <img src="/user-icon.png" alt="bot-pfp-icon" className="message-image"></img>
                                    <span className="message-text user-message-text">{message.text}</span>
                                </div>)
                        }

                    })}
                </div>
                <form className="input-bar" onSubmit={handleMessageSend}>
                    <input className="input-element" onChange={handleChange} value={inputValue} type="text" placeholder="Enter your text here..."></input>
                    <button type="submit" className="arrow-button"><img src="/arrow-icon.png" alt="send-arrow-icon" className="arrow-icon" /></button>
                </form>

            </div>}
        </div>
    );
};

export default ChatButton;